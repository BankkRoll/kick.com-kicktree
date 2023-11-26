import type { NextApiRequest, NextApiResponse } from 'next';
import { KickApiWrapper } from 'kick.com-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const isLambda = !!process.env.AWS_LAMBDA_FUNCTION_VERSION;
    let puppeteerOptions = {};

    if (isLambda) {
      const chromium = require('chrome-aws-lambda');
      puppeteerOptions = {
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
      };
    }

    const kickApi = new KickApiWrapper({
      apiVersion: 'v1',
      puppeteer: puppeteerOptions,
    });

    const featuredStreams = await kickApi.fetchFeaturedLivestreams('en');
    res.status(200).json(featuredStreams);
  } catch (error) {
    console.error('API handler error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
