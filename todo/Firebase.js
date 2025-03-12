// Firebase v9以降では、モジュール方式のAPIを使用
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import Constants from 'expo-constants';

// app.jsonのextraセクションからFirebase設定を取得
const { 
  firebaseApiKey, 
  firebaseAuthDomain, 
  firebaseDatabaseURL, 
  firebaseProjectId, 
  firebaseStorageBucket, 
  firebaseMessagingSenderId, 
  firebaseAppId 
} = Constants.expoConfig.extra;

// Firebaseの初期化
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  databaseURL: firebaseDatabaseURL,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database; 