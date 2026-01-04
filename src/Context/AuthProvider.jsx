import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';

export const AuthContext = createContext(null)

const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('email') 

const AuthProvider = ( {children} ) => {
    const [ user, setUser] = useState(null)
    const [loading, setLoading] = useState(true) 

    const createUser = ( email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword( auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup( auth, googleProvider )
    }


const updateUser = async (updateData) => {
  if (!auth.currentUser) throw new Error("No authenticated user found");

  await updateProfile(auth.currentUser, updateData);
  await auth.currentUser.reload();  
  setUser(auth.currentUser);         

  return auth.currentUser;
};

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                currentUser.email = currentUser.email || currentUser.providerData?.[0]?.email;
                currentUser.photoURL = currentUser.photoURL || currentUser.providerData?.[0]?.photoURL;
                setUser(currentUser);
            } else {
                setUser(null);
            }

            setLoading(false);
        });
    return () => unsubscribe();
}, []);

    const userInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signInUser,
        googleSignIn,
        updateUser,
        signOutUser,
    }

    return (
        <AuthContext.Provider value={userInfo}> 
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;