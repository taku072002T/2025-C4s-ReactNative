import 'dotenv/config';

export default {
name: "todo",
slug: "todo",
version: "1.0.0",
orientation: "portrait",
icon: "./assets/icon.png",
userInterfaceStyle: "light",
newArchEnabled: true,
splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
},
ios: {
    supportsTablet: true
},
android: {
    adaptiveIcon: {
    foregroundImage: "./assets/adaptive-icon.png",
    backgroundColor: "#ffffff"
    }
},
web: {
    favicon: "./assets/favicon.png"
},
  // 環境変数を.envから取得
extra: {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID
}
}; 