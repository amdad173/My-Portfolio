import React, { useEffect, useState } from 'react'
import ProfileLayout from '../components/Layout/ProfileLayout'
import {db, storage} from "../config/firebase"
import {getDownloadURL, ref, uploadBytes, listAll, deleteObject} from 'firebase/storage'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {v4} from 'uuid'
import { useParams } from 'react-router-dom'
import InputImage from '../components/form/InputImage';

const UpdateProject = () => {
  const {id} = useParams();
  const [projectName, setProjectName] = useState("")
  const [projectUrl, setProjectUrl] = useState("")
  const [description, setDescription] = useState("")
  const [keyword, setKeyword] = useState("")
  const [keywordList, setKeywordList] = useState([])
  const [folderRef, setFolderRef] = useState("")
  const [imageUpload, setImageUpload] = useState(null)
  const [imageUpdate, setImageUpdate] = useState(null)
  const [imageUrls, setImageUrls] = useState([])
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  const getData = async ()=>{
    try{
        const response = await getDoc(doc(db, "projects", id))
        const project = response.data()
        setProjectName(project.name)
        setProjectUrl(project.url)
        setDescription(project.description)
        setKeywordList([...project.keywords])
        setFolderRef(project.imageFolder)
        // console.log(response.data())

        const all_images = await listAll(ref(storage, `${project?.imageFolder}/`))
        // console.log(all_images)
        all_images.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageUrls((prev) => [...prev, url]);
            setCount(pre=> pre+1)
          });
        });
        
    }catch(error){
        console.log(error)
    }
  }
  useEffect(()=>{
    getData()
  },[])

  
  const update = async (e)=>{
    e.preventDefault()

    try{
      await updateDoc(doc(db, "projects", id), {
        name: projectName,
        url: projectUrl,
        description: description,
        keywords: keywordList,
      })
      setMessage("Updated Successfully")
      // alert("Updated successfully")
    }catch(error){
      // console.log(error)
      setMessage(error.message)
    }
  }

  ////////////// image crud ////////////
  const uploadImage = async ()=>{
    if (imageUpload == null) return;

    const imageRef = ref(storage, `${folderRef}/${v4()}`)
    try{
      const snapshot = await uploadBytes(imageRef, imageUpload)
      getDownloadURL(snapshot.ref).then((url)=>{
        setImageUrls(pre => [...pre, url]);
        setCount(pre=> pre+1)
      });
      // console.log("image", imageUrls)
      setMessage("Image Added successfully")
      setImageUpload(null)
      // alert("image uploaded success fully")
      
    } catch(error){
      setMessage(error.message)
      // console.log(error)
    }
  }

  const deleteImage = async (url)=> {
    try{
      await deleteObject(ref(storage, url))
      setImageUrls((pre)=> pre.filter((x)=> x!==url))
      setCount((pre)=> { 
        return (pre > 0)? pre-1: pre;
      })
      setMessage("Image deleted successfully")
    }catch(error){
      setMessage(error.message)
      // console.log(error)
    }
  }
  // for separate image name and folder name
  const getImageInfoFromUrl = (url) => {
    const parts = url.split('/'); // Split the URL by '/'
    console.log(url)
    const info = parts[parts.length - 1].split("%2F");
    const folderName = info[0]
    const imageName = info[1].split('?')[0]

  return `${folderName}/${imageName}`;
  };

  const updateImage = async (url)=>{
    try{
      if (imageUpdate == null) return;
      // firebase dont provide an update method so delete and upload new image as same name
      await deleteObject(ref(storage, url))
      setImageUrls((pre)=> pre.filter((x)=> x!==url))
      
      const imageRef = ref(storage, getImageInfoFromUrl(url));
      const snapshot = await uploadBytes(imageRef, imageUpdate)
      getDownloadURL(snapshot.ref).then((url)=>{
        setImageUrls(pre => [...pre, url]);
      });
      setMessage("Image updated successfully")
      setImageUpdate(null)
      // console.log("updated successfully")
    }catch(error){
      setMessage(error.message)
      // console.log(error)
    }
  }



  return (
    <ProfileLayout>
      <div className='login container '>
        <form className='center-form'>
          <h2>Update Project</h2>
          <input type="text"
            placeholder='Project Name'
            value={projectName}
            onChange={(e)=> setProjectName(e.target.value)}
            required
          />
          <input type="text"
            placeholder='Project Link'
            value={projectUrl}
            onChange={(e)=> setProjectUrl(e.target.value)}
            required
          />
          <textarea type="text"
            placeholder='Descriptoin'
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            required
          />
          {/* keyword and keyword list section */}
          <div className='keywords'>
            <input type="text"
              placeholder='Add Keyword to list'
              value={keyword}
              onChange={(e)=> setKeyword(e.target.value)}
            />
            <button
              onClick={(e)=>{
                e.preventDefault()
                if(keyword) setKeywordList((pre)=> [...pre, keyword]);
                setKeyword("")
              }}
            >Add</button>
            <button 
              onClick={(e)=>{
                e.preventDefault()
                setKeywordList(keywordList.slice(0, keywordList.length - 1))
              }}
            >Delete</button>
            <p>List: 
              {keywordList.map((word, index)=>{
                return (
                  <span key={index}>
                    {`${index===0? " "+word : ", "+word}`}
                  </span>)
                })}
            </p>
          </div>

          <button onClick={update}>Update</button>
        </form>

        <div className='update-images'> 
        <p>{message}</p>
        <h4>Total Images: {count}</h4>

          {/* image upload */}
          <InputImage
            addImage={"Add ScreenShoots of the Project"}
            saveImage={"Save Image"} 
            handleSave={uploadImage}
            imageUpload={imageUpload}
            setImageUpload={setImageUpload}
          />

          {/* image show case  */}
          {imageUrls.map((url, index)=>{
            return (
              <div className='add-images' key={index}>
                <img src={url} alt={projectName+"app image"}/><br/>
                
                <InputImage
                  addImage={"Change Image"}
                  saveImage={"Save Changes"} 
                  handleSave={()=>updateImage(url)}
                  handleDelete={()=> deleteImage(url)}
                  imageUpload={imageUpdate}
                  setImageUpload={setImageUpdate}
                />
                {/* <button onClick={()=> deleteImage(url)}>Delete</button> */}
              </div>
            )
          })}
        </div>
      </div>
    </ProfileLayout>
  )
}

export default UpdateProject