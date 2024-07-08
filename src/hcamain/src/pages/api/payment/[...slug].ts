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

    // Forward original URL query to remote request URL
    const params = new URLSearchParams(query as Record<string, string>);
    params.delete('slug');
    remoteRequestUrl.search = params.toString() || '';

    // fetch from remote integration layer server
    delete headers.host;
    delete headers.referer;

    const response = await fetch(remoteRequestUrl.href, {
      method,
      body: method === 'GET' ? undefined : body,
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
