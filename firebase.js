import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: `${process.env.AUTH_DOMAIN}`,
  projectId: "mycommute-51103",
  databaseURL: "https://mycommute-51103-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "mycommute-51103.appspot.com",
  messagingSenderId: "315209040690",
  appId: "1:315209040690:web:0fa90c65d8d1af19dc0d2b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export {app, db, auth};