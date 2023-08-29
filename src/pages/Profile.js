import React, { useEffect, useRef, useState } from 'react'
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
  const imageRef = useRef();


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
    // eslint-disable-next-line
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

  //image input selector using useRef
  const imageSelect = ()=>{
    imageRef.current.click()
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
      setImageUpload(null)
      // console.log("image changed successfully")
    }catch(error){
      console.log(error)
    }
  }

  return (
    <ProfileLayout>
        <div className='container'>
          <div className='admin-intro'>
            <div>
              {!imageUpload ? 
                <img  src={imageUrl} alt="Amdad profile" />
                :
                <img  src={URL.createObjectURL(imageUpload)} alt="Amdad Profile" />
              }
              <input
                ref={imageRef}
                style={{display: "none"}} 
                type="file" 
                accept='image/png, image/jpeg'
                required 
                onChange={(e)=>{setImageUpload(e.target.files[0])}}
                />
              {!imageUpload ? 
                <button onClick={()=> imageSelect()}>Change Photo</button>
                :
                <button onClick={()=> updateImage()}>Upload Photo</button>
              }
            </div>
            <div>
              <h3>
                {user?.name}
                <button onClick={update}>
                  <BiSolidEdit />
                </button>
              </h3>
              <textarea 
                type="text" 
                value={description}
                placeholder='Intorduce your self'
                onChange={(e)=>setDescription(e.target.value)}
                disabled = {edit}
              /> 
              
            </div>
          </div>

          <Skills />

        </div>
    </ProfileLayout>
  )
}

export default Profile