import Images from '../Images'
import {BiLinkExternal} from "react-icons/bi"
import {LuLoader} from "react-icons/lu"
import "../../styles/projectList.css"
import { useState } from 'react'

const ProjectList = ({projects}) => {
  const [showProjects, setShowProjects] = useState([...projects.slice(0,3)])
  const addProjects = () =>{
    const start = showProjects.length
    const end = start + 3
    setShowProjects(pre => [...pre, ...projects.slice(start, end)])
  }
  return (
    <div id='projects' className='container'>
      <h2>MY PROJECTS</h2>
      <div className='project-list'>
        {showProjects.map((project, index)=>{
                  return (
                    <div className='project-container' key={index}>
                      <Images folder={project?.imageFolder} />     
                      <div className='project-info'>
                        <div>
                          <h3>{project?.name}</h3>
                          <a href={project?.url} target="_blank" rel="noreferrer"><BiLinkExternal /></a>
                        </div>
                        <p className='project-description'>{project?.description}</p>
                        <p className='project-keyword'>{project?.keywords.map((key, index)=> <span key={index}>{key} </span>)}</p>
                      </div>
                    </div>
                  )
              })}
      </div>
      {
        (projects.length > 1 && projects.length !== showProjects.length) 
        && 
        <button
          className='loadMore-btn' 
          onClick={addProjects}
        >
          Load more
          <LuLoader className="icon-style"/>
        </button>
      }
    </div>
  )
}

export default ProjectList