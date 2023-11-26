import type { NextApiRequest, NextApiResponse } from 'next';
import chromium from 'chrome-aws-lambda'; // Import chrome-aws-lambda
import { KickApiWrapper } from 'kick.com-api'; // Your custom module

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Configure KickApiWrapper for serverless environment
    const kickApi = new KickApiWrapper({
      apiVersion: 'v1',
      puppeteer: {
        executablePath: await chromium.executablePath,
      },
    });

    // Fetch channel data using the specified API version
    const channelData = await kickApi.fetchChannelData(req.query.channelName as string, 'v1');
    res.status(200).json(channelData);
  } catch (error) {
    console.error('API handler error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
