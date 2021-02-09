// the sole purpose of this file is to add our google's client id to
// our app.json using environment variables so that we don't give it away

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
    },
  };
};
