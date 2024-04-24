import { useQuery } from '@tanstack/react-query';

import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateCurrentUser, updateProfile} from 'firebase/auth';
import app from '..//Firebase/firebase.config'
export const AuthContext = createContext({});
const auth = getAuth(app);


export const AuthContextProvider = ({children}) => {
    const [user,setUser] = useState({});
     const [account,setAccount] = useState({});
    const [loading,setLoading] = useState(true);
    const [newTitle,setNewTitle] = useState('Home');
    const googleProvider = new GoogleAuthProvider() ;

    document.title = newTitle;
    
    
    const { data: accData = {}, isFetching: accDataFetching, isLoading: accDataLoading } = useQuery(
        ['accData', user?.email], // Unique query key
        async () => {
          try {
            const response = await fetch(`${process.env.NODE_ENV === 'production' ? "" : "http://localhost:5000"}/api/user/${user?.email}`);
      
            if (!response.ok) {
              throw new Error(`API request failed with status ${response.status}`);
            }
      
            return await response.json();
          } catch (error) {
            console.error('Error fetching account data:', error);
            // Optionally handle errors in your UI (e.g., display an error message)
            return undefined; // Or a default value for data
          }
        },
        {
          enabled: !!user?.email, refetchOnWindowFocus: false
        }
      );
      
   

    


    const googleLogin = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const loginWithemail = (email,password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }
   
     
    const signIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = ()=>{
        setLoading(true)
        return signOut(auth);
    }
    const createUser = (email, password)=>{
        
        return createUserWithEmailAndPassword(auth, email, password);
    } 
    const updateUser = (profile)=>{
        return updateProfile(auth.currentUser, profile);
    }
    useEffect(()=>{
        const unsubscribe =  onAuthStateChanged(auth, currentUser =>{
             setUser(currentUser);
            
             setLoading(false)
         })
         return ()=>{
             unsubscribe();
         }
     },[])

     useEffect(()=>{
        setLoading(true)
        
        setTimeout(() => {
        }, 2000);
        setLoading(false);
     },[])


    const authInfo = {accData,accDataLoading, accDataFetching,setAccount,setNewTitle,logOut,createUser,updateUser, loginWithemail, user,loading, setUser,signIn, googleLogin,setLoading} 

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}
    


export default AuthContextProvider;