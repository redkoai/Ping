// The sole purpose of this file is to add our sensitive 
// environment variables to our app.json in a secure way.

// The reason we're not ditching our app.json entirely is that:
// Static configs can be automatically updated with CLI tools, 
// whereas dynamic configs must be manually updated by the developer.

export default ({ config }) => {
  return {
    ...config,
    ios: {
      ...config.ios,
      config: {
        googleSignIn: {
          reservedClientId: process.env.IOS_RESERVED_CLIENT_ID,
        },
      },
    },
    web: {
      ...config.web,
      config: {
        firebase: {
          apiKey: process.env.API_KEY,
          authDomain: process.env.AUTH_DOMAIN,
          databaseURL: process.env.DATABASE_URL,
          projectId: process.env.PROJECT_ID,
          storageBucket: process.env.STORAGE_BUCKET,
          messagingSenderId: process.env.MESSAGING_SENDER_ID,
          appId: process.env.APP_ID,
          measurementId: process.env.MEASUREMENT_ID,
        },
      },
    },
  };
};
