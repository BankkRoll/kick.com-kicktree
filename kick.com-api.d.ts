declare module 'kick.com-api' {
    interface KickApiWrapperOptions {
      userAgent?: string;
      apiVersion?: string;  // Include apiVersion if it's a supported option
      // ... other constructor options
    }

    export class KickApiWrapper {
      constructor(options?: KickApiWrapperOptions);
      fetchChannelData(channelName: string, version?: string, fields?: string[]): Promise<any>;
      // ... other methods you use from the library
    }


}
