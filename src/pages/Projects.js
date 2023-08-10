import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase'
import {collection, deleteDoc, doc, getDocs} from "firebase/firestore"
import ProfileLayout from '../components/Layout/ProfileLayout'
import { useNavigate } from 'react-router-dom'
import Images from '../components/Images'
import {BiLinkExternal} from "react-icons/bi"
import "../styles/projectList.css"

const Projects = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(()=>{
       const getData = async ()=>{
            try{
                const response = await getDocs(collection(db, "projects"))
                setData(response.docs.map((doc)=>{
                    return {...doc.data(), id: doc.id} //object with data and id, because id not provided inside data
                }))
                // console.log(response)
            }catch(error){
                console.log(error)
            }
        }
        getData()
    },[])

    const delete_project = async (id, name)=>{
        let isExecuted = window.confirm(`Do you want to delete ${name} project?`);
        if(!isExecuted) return;
        try{
            await deleteDoc(doc(db, "projects", id));
            console.log(`${id} deleted successfully`)

            setData(data.filter((project)=>{
                return project.id!==id;
            }))
        } catch(error){
            console.log(error)
        }
    }

  return (
    <ProfileLayout>
        <div id='projects' className='container'>
            <h2>Project's</h2>
            <div className='project-list'>
                {data.map((project)=>{
                    return (
                        <div className='project-container'>
                            <Images folder={project?.imageFolder} />     
                            <div className='project-info'>
                                <div>
                                <h3>{project?.name}</h3>
                                <a href={project?.url} target="_blank" rel="noreferrer"><BiLinkExternal /></a>
                                </div>
                                <p className='project-description'>{project?.description}</p>
                                <p className='project-keyword'>{project?.keywords.map((key, index)=> <span key={index}>{key} </span>)}</p>
                            </div>
                            <button onClick={()=> navigate(`/admin/update-project/${project.id}`)}>Edit</button>
                            <button onClick={()=>{delete_project(project.id, project.name)}}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    </ProfileLayout>
  )
}
 
export default Projects