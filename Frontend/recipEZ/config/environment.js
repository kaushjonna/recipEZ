var environments = {
  staging: {
    FIREBASE_API_KEY: 'AIzaSyCI6ea8qyAbhubb1IS2erWsuFR1etths_E',
    // FIREBASE_AUTH_DOMAIN: 'XXXX',
    FIREBASE_DATABASE_URL: 'https://recipez-73595.firebaseio.com',
    FIREBASE_PROJECT_ID: 'recipez-73595',
    FIREBASE_STORAGE_BUCKET: 'gs://recipez-73595.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '894854253432',
    GOOGLE_CLOUD_VISION_API_KEY: 'AIzaSyBo-Bk-ntZs-t0NSiA9Wp5HCCcz7zEb2rM'
  },
  production: {
    // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
  }
};

function getReleaseChannel() {
  let releaseChannel = Expo.Constants.manifest.releaseChannel;
  if (releaseChannel === undefined) {
    return 'staging';
  } else if (releaseChannel === 'staging') {
    return 'staging';
  } else {
    return 'staging';
  }
}
function getEnvironment(env) {
  console.log('Release Channel: ', getReleaseChannel());
  return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());

export default Environment;