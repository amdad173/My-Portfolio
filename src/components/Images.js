import React, { useEffect, useState } from 'react'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../config/firebase'
import {AiOutlineArrowRight,AiOutlineArrowLeft } from "react-icons/ai"
const Images = ({folder}) => {
    const [imageUrls, setImageUrls] = useState([])
    const [count, setCount] = useState(0);

    const get_images = async ()=>{
        try{
            const allImgObj = await listAll(ref(storage, `${folder}/`))
            const sortedImgObj = allImgObj.items.sort((a, b) => {
                // Extract the number from the file names
                const numA = Number(a.name);
                const numB = Number(b.name);
                
                // Compare the numbers
                return numA - numB;
              });
              
              // Create an array of image download URLs
              const imageLinks = await Promise.all(sortedImgObj.map(async (file) => {
                const imageUrl = await getDownloadURL(file);
                return imageUrl;
              }));
      
              setImageUrls(imageLinks)
        } catch(error){
            console.log(error)
        }

    }
    useEffect(()=>{
        get_images()
        // eslint-disable-next-line
    },[])

  return (
    <div className='image-container'>
        <div className='image-slider'>
            {imageUrls.map((url, index)=>{
            return (
                <div  className={count === index ? "show-image" : count - 1 === index ? "from-left" : ""} key={index}>
                    <img 
                        key={index} src={url} 
                        alt="Prject show" 
                    />
                </div>
                )
            })}
        </div>
        <div className='imgSlider-btn'>
            <p>{count+1} / {imageUrls.length}</p>
            <button onClick={() =>
                setCount((pre) => {
                    return pre > 0 ? pre - 1 : pre;
                })
            }><AiOutlineArrowLeft/></button>
            <button onClick={() =>
                setCount((pre) => {
                    return pre < imageUrls.length-1 ? pre + 1 : pre;
                })
            }><AiOutlineArrowRight /></button>
        </div>
    </div>
  )
}

export default Images
