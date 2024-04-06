import { initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyA92XwxvzVwktloaBIUq0TKbv3bhabWXN0",
  authDomain: "game-vault-app-3158e.firebaseapp.com",
  projectId: "game-vault-app-3158e",
  storageBucket: "game-vault-app-3158e.appspot.com",
  messagingSenderId: "57123834579",
  appId: "1:57123834579:web:d943dbc98ef42b4b5da226"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});