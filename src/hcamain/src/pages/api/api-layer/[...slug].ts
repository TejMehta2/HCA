import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import stream from 'stream';
import { promisify } from 'util';

const pipeline = promisify(stream.pipeline); // allow us to forward promise to asset

// Proxy requests to remote integration API layer
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method = 'GET', body, query, headers } = req;

    // Construct remote request URL
    const slug = query.slug as string[] | string;
    const path = typeof slug === 'string' ? slug : slug?.join('/');
    const remoteRequestUrl = new URL(path, process.env.INTEGRATION_LAYER_URL);

    // eslint-disable-next-line
    // @ts-ignore
    delete query.slug;

    // Forward original URL query to remote request URL
    const params = [...Object.entries(query)];

    // Format to avoid comma separated list for multiple params of same key
    const search = params
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}=${encodeURIComponent(value)}`;
        } else {
          return value
            ?.map((value) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
        }
      })
      .join('&');

    remoteRequestUrl.search = search;
    // fetch from remote integration layer server
    delete headers.host;
    delete headers.referer;
    const response = await fetch(remoteRequestUrl.href, {
      method,
      body: method === 'GET' ? undefined : JSON.stringify(body),
      headers: headers as Record<string, string>,
    });

    if (!response.ok || !response.body) {
      throw `unexpected response ${response.statusText} at ${remoteRequestUrl} (${req.url})`;
    }
    await pipeline(response.body, res);
  } catch (err) {
    console.log(err); // log to server
    return res.status(500).send(err);
  }
}
