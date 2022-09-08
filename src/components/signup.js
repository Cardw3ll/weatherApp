import React, { useRef, useState } from 'react';
// import {auth} from '../firebase';
import {logout,login, signUp, useAuth} from '../firebase';
import Profile from './profile';
function Signup() {
    //use ref to get direct change
    const emailRef = useRef();
    const passwordRef = useRef();

    //to get the current user logged into your website
    const currentUser = useAuth();

//for the program not to take time when it loads information to firebase
    const [loading,setLoading] = useState(false);

    //use navigate to move through pages
    // let navigate = useNavigate();

//for signup button to register the user to firebase
    async function handleSignup(){
        setLoading(true);
        try{
            
        await signUp(emailRef.current.value,passwordRef.current.value);
        // navigate.push("/Login")

        } catch{
            alert("email already exists");
        }
        setLoading(false);
    }

    //to log in the user
    async function handleLogin(){
        setLoading(true);
        try{
            
        await login(emailRef.current.value,passwordRef.current.value);
        // navigate.push("/Login")

        } catch{
            alert("Login already exists");
        }
        setLoading(false);
    }
    //to logout the useer from website
    async function handleLogout(){
        setLoading(true);
      try { 
        logout()
    } catch{
        alert("Couldn't logout");
    }
    setLoading(false);
    }

    
  return (

    <div>
        <div>{currentUser?.email}</div>
        {!currentUser && <>
               <input ref={emailRef} type="email" />
        <input ref={passwordRef}  type="password" />
        <button onClick={handleSignup}>Sign up</button>
        <button onClick={handleLogin}>Login</button>
        </>}
     
        
       {currentUser&& <>
        <Profile/>
        <button disabled={loading || !currentUser} onClick={handleLogout}>Log out</button>
       </>}
    </div>
  )
}

export default Signup;