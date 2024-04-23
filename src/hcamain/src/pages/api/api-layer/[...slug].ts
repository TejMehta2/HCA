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
    const { method = 'GET', url = '', body } = req;
    const remoteRequestUrl = new URL(
      url.replace('/api/api-layer', ''),
      process.env.INTEGRATION_LAYER_URL
    );
    const response = await fetch(remoteRequestUrl.href, {
      method,
      body: method === 'GET' ? undefined : JSON.stringify(body),
    }); // fetch from CMS server

    if (!response.ok || !response.body)
      throw `unexpected response ${response.statusText} at ${remoteRequestUrl} (${req.url})`;
    await pipeline(response.body, res);
  } catch (err) {
    console.log(err); // log to server
    return res.status(500).send(err);
  }
}
