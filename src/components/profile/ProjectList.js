import React, { useState } from 'react'
import Images from '../Images'
import {BiLinkExternal} from "react-icons/bi"
import "../../styles/projectList.css"

const ProjectList = ({projects}) => {
  return (
    <div id='projects' className='container'>
      <h2>Project's</h2>
      <div className='project-list'>
        {projects.map((project)=>{
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
                    </div>
                  )
              })}
      </div>
    </div>
  )
}

export default ProjectList