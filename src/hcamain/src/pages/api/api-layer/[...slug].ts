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
    const requestUrl = req.url as string;
    const remoteRequestUrl = new URL(
      requestUrl.split('api-layer')[1],
      process.env.INTEGRATION_LAYER_URL
    );
    const response = await fetch(remoteRequestUrl.href); // fetch from CMS server
    if (!response.ok || !response.body)
      throw `unexpected response ${response.statusText} at ${remoteRequestUrl} (${req.url})`;
    await pipeline(response.body, res);
  } catch (err) {
    console.log(err); // log to server
    return res.status(500).send('File unavailable, please try again later.');
  }
}
