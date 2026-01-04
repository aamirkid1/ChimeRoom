import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtFRyI9TTToqQs0hD5yoW2ue3yAU9mx68",
  authDomain: "chatapp-30a90.firebaseapp.com",
  projectId: "chatapp-30a90",
  storageBucket: "chatapp-30a90.firebasestorage.app",
  messagingSenderId: "503012297680",
  appId: "1:503012297680:web:d48a3b6abc34fc8790c7d5",
};

const app = initializeApp(firebaseConfig);

//  Firebase Authentication instance
export const auth = getAuth(app);
