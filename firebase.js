import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getDatabase } from "firebase/database";
import {API_KEY, AUTH_DOMAIN, AUTH_DATABASE, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID} from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: AUTH_DATABASE,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export {app, db, auth};