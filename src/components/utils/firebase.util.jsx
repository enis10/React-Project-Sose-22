import {initializeApp} from 'firebase/app';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {getStorage} from 'firebase/storage'

import{ getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, userAuth,
    signInWithEmailAndPassword,
createUserWithEmailAndPassword,updateProfile,
signOut


} from 'firebase/auth';
import{getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'




const firebaseConfig = {
  apiKey: "AIzaSyARJ7HFo2GhXifjJbOX5CgL-wdgkMAHxPk",
  authDomain: "projektda3.firebaseapp.com",
  projectId: "projektda3",
  storageBucket: "projektda3.appspot.com",
  messagingSenderId: "797709824005",
  appId: "1:797709824005:web:153bcbf05b13df4ab2ec6c"
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider(); /* ermäglicht das Anmelden  mit einem Goole-Konto      */
  googleProvider.setCustomParameters({
      prompt: "select_account"  /*Jedes mal dass man den Provider interagiert, man wird verpflichtet ein Konto zu wählen */
  }); /* how google Provider behaves*/

  export  const auth = getAuth(); // erlabaut ein Benutzer zu erkennen
  export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider); // Popup Anmelden mit Google
  export const db = getFirestore();// Database inside of the console of FireBase
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
  export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
  ) => {
    if (!userAuth) return;
  
    const userDocRef = doc(db, 'users', userAuth.uid);
  
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };
export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return ;
    
   return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return ;
    await signInWithEmailAndPassword(auth, email, password);
    
}
export const signOutUser = () =>signOut(auth);
export default db ;


export  const storage = getStorage(app);