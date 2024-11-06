import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDF3h_8mHGGs4REC-nJ2Fgk3ofBu5E9cwI",
//   authDomain: "buffalo-burger-73090.firebaseapp.com",
//   projectId: "buffalo-burger-73090",
//   storageBucket: "buffalo-burger-73090.appspot.com",
//   messagingSenderId: "813583745340",
//   appId: "1:813583745340:web:1dcf4735da6b53193fde39",
//   measurementId: "G-NFHVQGTH7D",
// };

const firebaseConfig = {
  apiKey: "AIzaSyB938mwob15coVUd54hbLJNzBmRbqhK80M",
  authDomain: "buffalo-burger-432d6.firebaseapp.com",
  projectId: "buffalo-burger-432d6",
  storageBucket: "buffalo-burger-432d6.firebasestorage.app",
  messagingSenderId: "676912297668",
  appId: "1:676912297668:web:abf14165867ae338363b91"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Function to fetch data from Firebase
export const fetchData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};


/////////////////////////////////
export async function getUserInfoById(userId) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      username: data.username,
      email: data.email,
      phoneNumber: data.phone,
    };
  } else {
    console.log("No such document!");
    return null;
  }
}

// Register a new user
export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User registered:", userCredential.user);
  } catch (error) {
    console.error("Error registering:", error);
  }
};

// Login existing user
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential
  } catch (error) {
    console.log("Error logging in:", error);
  }
};


// Get user data by UID
export const getUserByUid = async (uid) => {
  try {
    const docRef = doc(db, "users", uid); // استبدل "collectionName" باسم المجموعة الخاصة بك
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data(); // إرجاع البيانات
    } else {
      console.log("No such document!");
      return null; // إرجاع null إذا لم يتم العثور على الوثيقة
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null; // إرجاع null في حالة وجود خطأ
  }
};