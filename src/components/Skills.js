import React, { useEffect, useState } from 'react'
import InputArray from './form/InputArray'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

const Skills = () => {
    const id = process.env.REACT_APP_FIREBASE_SKILLS_ID
    const [frontend, setFrontend] = useState([])
    const [backend, setBackend] = useState([])
    const [tools, setTools] = useState([])
    const [learning, setLearning] = useState([])

    const getSkills = async ()=>{
    
        try{
          const response = await getDoc(doc(db, "skills", id))
        //   console.log(response.data())
          setFrontend(response?.data()?.frontend)
          setBackend(response?.data()?.backend)
          setTools(response?.data()?.tools)
          setLearning(response?.data()?.learning)
          
        }catch(error){
          console.log(error)
        }
      }
      useEffect(()=>{
        getSkills()
      },[])

      const update = async (e)=>{
        e.preventDefault()
    
        try{
          await updateDoc(doc(db, "skills", id), {
            fronend: frontend,
            backend: backend,
            tools: tools,
            learning: learning,
          })
        //   console.log("Updated successfully")
        }catch(error){
          console.log(error)
        }
      }
    


    const addValue = (name, keyword, setKeyword)=>{
        if(!keyword) return;
        if(name==="Frontend") setFrontend((pre)=> [...pre, keyword]);
        if(name==="Backend") setBackend((pre)=> [...pre, keyword]);
        if(name==="Tools") setTools((pre)=> [...pre, keyword]);
        if(name==="Learning") setLearning((pre)=> [...pre, keyword]);
        setKeyword("")
    }

    const deleteValue = (name)=>{
        if(name==="Frontend") setFrontend((pre)=> pre.slice(0, pre.length - 1))
        if(name==="Backend") setBackend((pre)=> pre.slice(0, pre.length - 1))
        if(name==="Tools") setTools((pre)=> pre.slice(0, pre.length - 1))
        if(name==="Learning") setLearning((pre)=> pre.slice(0, pre.length - 1))
    }

    

  return (
    <div>
        <InputArray 
            keywordList={frontend}
            value={"Frontend"}
            add={addValue}
            del={deleteValue}
        />
        <InputArray 
            keywordList={backend}
            value={"Backend"}
            add={addValue}
            del={deleteValue}
        />
        <InputArray 
            keywordList={tools}
            value={"Tools"}
            add={addValue}
            del={deleteValue}
        />
        <InputArray 
            keywordList={learning}
            value={"Learning"}
            add={addValue}
            del={deleteValue}
        />
        <button onClick={update}>Save Change</button>
    </div>
  )
}

export default Skills;