import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase'
import {collection, getDocs} from "firebase/firestore"
import ProfileLayout from '../components/Layout/ProfileLayout'
import { useNavigate } from 'react-router-dom'

const Projects = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(()=>{
       const getData = async ()=>{
            try{
                const response = await getDocs(collection(db, "projects"))
                setData(response.docs.map((doc)=>{
                    return {...doc.data(), id: doc.id}
                }))
                console.log(response)
            }catch(error){
                console.log(error)
            }
        }
        getData()
    },[])
  return (
    <ProfileLayout>
        {data.map((project)=>{
            return (
                <div key={project.id}>
                    <h3>{project.name}</h3>
                    <a href={project.url}>Link</a>
                    <p>{project.description}</p>
                    {project.keywords.map((key)=> <span>{key} </span>)}
                    <button onClick={()=> navigate(`/admin/update-project/${project.id}`)}>Edit</button>
                </div>
            )
        })}
    </ProfileLayout>
  )
}

export default Projects