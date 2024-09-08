import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, EmailAuthProvider, createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";










const firebaseConfig = {
  apiKey: "AIzaSyAG0foGPkVTzWXIhdEbkIbDYAKNDW2G4x4",
  authDomain: "primefx-e80c4.firebaseapp.com",
  projectId: "primefx-e80c4",
  storageBucket: "primefx-e80c4.appspot.com",
  messagingSenderId: "717712428715",
  appId: "1:717712428715:web:08438c77a78b279781f1ee",
  measurementId: "G-2R1SR3L4DK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const createUser = createUserWithEmailAndPassword;
export const SignInWithPopup = signInWithPopup;
export const authStateChanged = onAuthStateChanged;
export const emailProvider = new EmailAuthProvider();
export const db = getFirestore(app);

export function useAuthState() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return [currentUser];
}
