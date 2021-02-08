// the sole purpose of this file is to add our google's client id to
// our app.json using environment variables so that we don't give it away

export default ({ config }) => {
  return {
    ...config,
    ios: {
      ...config.ios,
      config: {
        googleSignIn: {
          reservedClientId: process.env.GOOGLE_CLIENT_ID,
        },
      },
    },
  };
};
