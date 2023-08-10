import React from 'react'
import Images from '../Images'

const ProjectCard = ({name, url, description, keywords, imageFolder}) => {
  return (
    <div className='project-card'>
        <div className='project' key={project.id}>
            <h3>{name}</h3>
            <a href={url}><BiLinkExternal /></a>
            <p>{description}</p>
            <p>keywords: {keywords.map((key, index)=> <span key={index}>{key} </span>)}</p>
        </div>
        <div>
            <Images folder={imageFolder} />
        </div>
    </div>
  )
}

export default ProjectCard