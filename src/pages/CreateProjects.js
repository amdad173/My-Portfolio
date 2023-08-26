import React, { useState } from 'react'
import ProfileLayout from '../components/Layout/ProfileLayout'
import {v4} from 'uuid'
import {collection, addDoc} from "firebase/firestore"
import { db } from '../config/firebase'

const CreateProject = () => {
  const [projectName, setProjectName] = useState("")
  const [projectUrl, setProjectUrl] = useState("")
  const [description, setDescription] = useState("")
  const [keyword, setKeyword] = useState("")
  const [keywordList, setKeywordList] = useState([])
  const [message, setMessage] = useState("")
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      await addDoc(collection(db, "projects"), {
        name: projectName,
        url: projectUrl,
        description: description,
        keywords: keywordList,
        imageFolder: v4()
      })

      const name = projectName
      setMessage(`${name} created successfully`)

      setProjectName("")
      setProjectUrl("")
      setDescription("")
      setKeywordList([]);
    } catch(error){
      console.log(error)
      setMessage(error.message)
    }
  }

  return (
    <ProfileLayout>
     <div className='login container'>
        <form>
          <h2>Create Project</h2>
          <p>{message}</p>
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
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </ProfileLayout>
  )
}

export default CreateProject