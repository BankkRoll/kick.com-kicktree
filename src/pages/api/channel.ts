import type { NextApiRequest, NextApiResponse } from 'next';
import chromium from 'chrome-aws-lambda';
import { KickApiWrapper } from 'kick.com-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const kickApi = new KickApiWrapper({
      apiVersion: 'v1',
    });

    const channelData = await kickApi.fetchChannelData(req.query.channelName as string, 'v1');
    res.status(200).json(channelData);
  } catch (error) {
    console.error('API handler error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
