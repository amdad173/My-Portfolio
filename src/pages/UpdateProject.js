import React, { useEffect, useState } from 'react'
import ProfileLayout from '../components/Layout/ProfileLayout'
import {db, storage} from "../config/firebase"
import {getDownloadURL, ref, uploadBytes, listAll, deleteObject} from 'firebase/storage'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {v4} from 'uuid'
import { useParams } from 'react-router-dom'

const UpdateProject = () => {
  const {id} = useParams();
  const [projectName, setProjectName] = useState("")
  const [projectUrl, setProjectUrl] = useState("")
  const [description, setDescription] = useState("")
  const [keyword, setKeyword] = useState("")
  const [keywordList, setKeywordList] = useState([])
  const [folderRef, setFolderRef] = useState("")
  const [imageUpload, setImageUpload] = useState(null)
  const [imageUrls, setImageUrls] = useState([])

  const getData = async ()=>{
    try{
        const response = await getDoc(doc(db, "projects", id))
        const project = response.data()
        setProjectName(project.name)
        setProjectUrl(project.url)
        setDescription(project.description)
        setKeywordList([...project.keywords])
        setFolderRef(project.imageFolder)
        console.log(response.data())

        const all_images = await listAll(ref(storage, `${project?.imageFolder}/`))
        console.log(all_images)
        all_images.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageUrls((prev) => [...prev, url]);
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
      alert("Updated successfully")
    }catch(error){
      console.log(error)
    }
  }

  ////////////// image crud ////////////
  const uploadImage = async (e)=>{
    e.preventDefault();
    if (imageUpload == null) return;

    const imageRef = ref(storage, `${folderRef}/${v4()+imageUpload.name}`)
    try{
      const snapshot = await uploadBytes(imageRef, imageUpload)
      getDownloadURL(snapshot.ref).then((url)=>{
        setImageUrls(pre => [...pre, url]);
      });
      console.log("image", imageUrls)
      alert("image uploaded success fully")
      
    } catch(error){
      console.log(error)
    }
  }

  const deleteImage = async (url)=> {
    try{
      await deleteObject(ref(storage, url))
      setImageUrls((pre)=> pre.filter((x)=> x!==url))
    }catch(error){
      console.log(error)
    }
  }
  // for separate image name and folder name
  const getImageInfoFromUrl = (url) => {
    const parts = url.split('/'); // Split the URL by '/'

    const info = parts[parts.length - 1].split("%2F");
    const folderName = info[0]
    const imageName = info[1].split('?')[0]

  return `${folderName}/${imageName}`;
  };

  const updateImage = async (url)=>{
    try{
      if (imageUpload == null) return;
      // firebase dont provide an update method so delete and upload new image as same name
      await deleteObject(ref(storage, url))
      setImageUrls((pre)=> pre.filter((x)=> x!==url))
      
      const imageRef = ref(storage, getImageInfoFromUrl(url));
      const snapshot = await uploadBytes(imageRef, imageUpload)
      getDownloadURL(snapshot.ref).then((url)=>{
        setImageUrls(pre => [...pre, url]);
      });


      console.log("updated successfully")
      console.log()
    }catch(error){
      console.log(error)
    }
  }



  return (
    <ProfileLayout>
      <h1>Update Project</h1>
      <form>
        <input type="text"
          placeholder='Project Name'
          value={projectName}
          onChange={(e)=> setProjectName(e.target.value)}
          required
        /><br/>
        <input type="text"
          placeholder='Project Link'
          value={projectUrl}
          onChange={(e)=> setProjectUrl(e.target.value)}
          required
        /><br/>
        <textarea type="text"
          placeholder='Descriptoin'
          value={description}
          onChange={(e)=> setDescription(e.target.value)}
          required
        /><br/>
        {/* keyword and keyword list section */}
        <div>
          <input type="text"
            placeholder='Keywords'
            value={keyword}
            onChange={(e)=> setKeyword(e.target.value)}
          />

          <button 
            onClick={(e)=>{
              e.preventDefault()
              setKeywordList((pre)=> [...pre, keyword]);
              setKeyword("")
            }}
          >Add</button>
          <button 
            onClick={(e)=>{
              e.preventDefault()
              setKeywordList(keywordList.slice(0, keywordList.length - 1))
            }}
          >Delete</button><br/>

          {keywordList.map((word, index)=>{
            return (
              <span>
                {`${index === 0? " "+word : ", "+word}`}
              </span>)
            })}          
        </div>

        <button onClick={update}>Update</button>
      </form><br/>

      {/* image upload */}
      <div>
      <input 
          type="file" 
          accept='image/png, image/jpeg'
          required 
          onChange={(e)=>{setImageUpload(e.target.files[0])}}
        />
        <button onClick={uploadImage}>Upload</button>
      </div>

      {/* image show case  */}
     {imageUrls.map((url)=>{
      return (
        <div>
          <img src={url} alt={projectName+"app image"}/><br/>
          <button onClick={()=> deleteImage(url)}>Delete</button>
          
          <input 
          type="file" 
          accept='image/png, image/jpeg'
          required 
          onChange={(e)=>{setImageUpload(e.target.files[0])}}
          />
          <button onClick={()=> updateImage(url)}>Update</button>
          <br/><br/>
        </div>
      )
     })}
    </ProfileLayout>
  )
}

export default UpdateProject