import React, { useState } from 'react'
import {BiSolidEdit} from "react-icons/bi"

const InputArray = ({ keywordList, value, add, del}) => {
    const [keyword, setKeyword] = useState("")
    const [edit, setEdit ] = useState(false)

  return (
    <div>
        <h3>
          {value}
          <button onClick={()=>setEdit(pre => !pre)}><BiSolidEdit /></button>
        </h3>
        <p>
          {keywordList.map((word, index)=>{
                return (
                  <span key={index}>
                    {`${index === 0? " "+word : ", "+word}`}
                  </span>)
                })}
        </p>
        
        
        {edit &&
          <div>
            <input type="text"
            placeholder='Keywords'
            value={keyword}
            onChange={(e)=> setKeyword(e.target.value)}
            />

            <button 
            onClick={()=>{add(value, keyword,setKeyword)}}
            >Add</button>
            <button 
            onClick={(e)=>{
                del(value, keyword)
            }}
            >Delete</button><br/>
          </div>
        }
    </div>
  )
}

export default InputArray