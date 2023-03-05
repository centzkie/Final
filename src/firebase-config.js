import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCN59o4Z4t-9HKqJKqDgUDsZ4GzIytiULE",
  authDomain: "qms-backup-d24c2.firebaseapp.com",
  projectId: "qms-backup-d24c2",
  storageBucket: "qms-backup-d24c2.appspot.com",
  messagingSenderId: "228246910044",
  appId: "1:228246910044:web:8409cde906effdcaa8a299",
  measurementId: "G-RVXTE8V7YQ"
  // apiKey: "AIzaSyCxhRaRQvlcvJMWnYNGP21HQYF5BBi6NFU",
  // authDomain: "queuing-system-management.firebaseapp.com",
  // projectId: "queuing-system-management",
  // storageBucket: "queuing-system-management.appspot.com",
  // messagingSenderId: "327014395803",
  // appId: "1:327014395803:web:505575b17f39b92ff8fb3e",
  // measurementId: "G-MZ8RJ2H67V",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
