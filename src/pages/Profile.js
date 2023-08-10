import React, { useEffect, useState } from 'react'
import ProfileLayout from '../components/Layout/ProfileLayout'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../config/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {BiSolidEdit} from "react-icons/bi"
import Skills from '../components/Skills';



const Profile = () => {
  const id = process.env.REACT_APP_FIREBASE_PROFILE_ID
  const [user, setUser] = useState({});
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageUpload, setImageUpload] = useState(null)
  const [edit, setEdit] = useState(true)


  const getUser = async ()=>{
    
    try{
      const response = await getDoc(doc(db, "profile", id))
      setUser(response?.data())
      setDescription(response?.data()?.intro)

      //profile image
      const image = await getDownloadURL(ref(storage, response?.data()?.image))
      setImageUrl(image)
      // console.log(response?.data())   
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getUser()
  },[])

  const update = async ()=>{
    if(edit) {
      setEdit(false)
      return;
    }
    try{
      await updateDoc(doc(db, "profile", id), {
        intro: description,
      })
      setEdit(true)
      console.log("updated successfully")
    }catch(error){
      console.log(error)
    }
  }

  
  // change images
  const updateImage = async ()=>{
    try{
      if (imageUpload == null) return;
      // firebase dont provide an update method so delete and upload new image as same name
      await deleteObject(ref(storage, imageUrl))
      
      const imageRef = ref(storage, imageUrl);
      const snapshot = await uploadBytes(imageRef, imageUpload)
      getDownloadURL(snapshot.ref).then((url)=>{
        setImageUrl(url);
      });

      // console.log("image changed successfully")
    }catch(error){
      console.log(error)
    }
  }

  return (
    <ProfileLayout>
        <div className='container'>
          <h2>{user?.name}</h2>
          <div>
            <div>
              <img style={{height:"150px"}} src={imageUrl} alt="My Image" /><br/>
              <input 
                type="file" 
                accept='image/png, image/jpeg'
                required 
                onChange={(e)=>{setImageUpload(e.target.files[0])}}
                />
              <button onClick={()=> updateImage()}>Change Profile Photo</button>
            </div>
            <textarea 
              type="text" 
              value={description}
              placeholder='Intorduce your self'
              onChange={(e)=>setDescription(e.target.value)}
              disabled = {edit}
            /> 
            <button onClick={update}>
              <BiSolidEdit />
            </button>
          </div>
          <Skills />
        </div>
    </ProfileLayout>
  )
}

export default Profile