import React, { useEffect, useState } from 'react';
import { useAuth, upload } from '../firebase';
import img1 from "./pp.png";


function Profile() {

 
  const currentUser = useAuth();
  const [photo,setPhoto] = useState(null);
  const [loading,setLoading] = useState(false);
  const [photoURL,setPhotoURL] = useState(img1);

    function handleChange(e){
      if (e.target.files[0]){
        setPhoto(e.target.files[0])
      }
    }
    function handleClick(){
      upload(photo,currentUser,setLoading)
    }
      useEffect(()=>{
        if(currentUser?.photoURL ){
          setPhotoURL( currentUser.photoURL);
        }
        
      },[currentUser])
   
  return (
    <div>
        <input type="file" onChange={handleChange} />
        <button disabled={loading|| !photo} onClick={handleClick}>upload</button>
        <img src={photoURL} alt="avator" className='profile'/>
    </div>
  )


  
}

export default Profile;