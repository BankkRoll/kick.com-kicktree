import type { NextApiRequest, NextApiResponse } from 'next';
import { KickApiWrapper } from 'kick.com-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Specify the API version when creating the instance
  const kickApi = new KickApiWrapper({ apiVersion: 'v1' });

  try {
    // Fetch the channel data using API version 1
    const channelData = await kickApi.fetchChannelData(req.query.channelName as string, 'v1');
    res.status(200).json(channelData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
