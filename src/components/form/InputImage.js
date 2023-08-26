import React, { useRef, useState } from 'react'

const InputImage = ({addImage, saveImage,imageUpload, setImageUpload, handleSave, handleDelete = null}) => {
    const [popUp, setPopUp] = useState(false)
    const imageRef = useRef();

  //image input selector using useRef
  const imageSelect = ()=>{
    imageRef.current.click()
  }
//  //////////////////add pop up/////////////////////
  return (
    <div>
      {popUp &&
        <div className='pop-up'>
          <div>
            <div>
              {imageUpload ? 
                <img  src={URL.createObjectURL(imageUpload)} alt="Project Screenshoots" />
                :
                <img  src="/emty.jpg" alt="Emty Screenshoot" />
              }
            </div>
            {imageUpload ? 
              <button type='submit' 
                onClick={()=> {
                handleSave()
                setPopUp(false)
                }}
              >{saveImage}</button>
              :
              <button type='submit' 
                onClick={()=> {
                imageSelect()}}
              >{addImage}</button>
            }
            <button type='submit' 
                onClick={()=> {
                setPopUp(false)
                setImageUpload(null)}}
            >Cencel</button>
          </div>
        </div>
      }

      <button type='submit' 
          onClick={()=> {setPopUp(true)}}
      >{addImage}</button>
      {/* optional button */}
      {handleDelete && 
        <button 
          onClick={()=> {
            if (window.confirm("Delete Image") === true) {
              handleDelete()
            }
          }}
        >Delete</button>}
 
      <input
      ref={imageRef}
      style={{display: "none"}} 
      type="file" 
      accept='image/png, image/jpeg'
      required 
      onChange={(e)=>{setImageUpload(e.target.files[0])}}
      />
    </div>
  )
}

export default InputImage