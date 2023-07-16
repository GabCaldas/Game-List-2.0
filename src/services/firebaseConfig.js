
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDF6me6wK5ed-uUFk73ABAI0UZ9fteiHXI",
  authDomain: "react-gamelist.firebaseapp.com",
  projectId: "react-gamelist",
  storageBucket: "react-gamelist.appspot.com",
  messagingSenderId: "810660847157",
  appId: "1:810660847157:web:20cab83508205aefbd5b7c"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export const auth= getAuth(app)