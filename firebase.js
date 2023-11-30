import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYuFk5qsyyRvu-sOHXfAcLkfX62x7wAmw",
  authDomain: "mycommute-51103.firebaseapp.com",
  projectId: "mycommute-51103",
  storageBucket: "mycommute-51103.appspot.com",
  messagingSenderId: "315209040690",
  appId: "1:315209040690:web:0fa90c65d8d1af19dc0d2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);