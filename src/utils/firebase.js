import { initializeApp } from "firebase/app";
import { getFirestore  , collection , getDocs } from "firebase/firestore";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDF3h_8mHGGs4REC-nJ2Fgk3ofBu5E9cwI",
  authDomain: "buffalo-burger-73090.firebaseapp.com",
  projectId: "buffalo-burger-73090",
  storageBucket: "buffalo-burger-73090.appspot.com",
  messagingSenderId: "813583745340",
  appId: "1:813583745340:web:1dcf4735da6b53193fde39",
  measurementId: "G-NFHVQGTH7D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const db = getFirestore(app);
// const auth = getAuth(app);

export const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "product"));
    const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return products; 
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};