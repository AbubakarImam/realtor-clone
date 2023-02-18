// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXZDN5YKd_JLfH2MaAbzPozMHITn7HuBs",
  authDomain: "realtor-app-react-43976.firebaseapp.com",
  projectId: "realtor-app-react-43976",
  storageBucket: "realtor-app-react-43976.appspot.com",
  messagingSenderId: "905799750435",
  appId: "1:905799750435:web:f60c3fa84c60cd1580f296"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();