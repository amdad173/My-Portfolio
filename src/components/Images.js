import React, { useEffect, useState } from 'react'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../config/firebase'
import {AiOutlineArrowRight,AiOutlineArrowLeft } from "react-icons/ai"
const Images = ({folder}) => {
    const [imageUrls, setImageUrls] = useState([])
    const [count, setCount] = useState(0);

    const get_images = async ()=>{
        try{
            const all_images = await listAll(ref(storage, `${folder}/`))
            all_images.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
                setImageUrls((prev) => [...prev, url]);
                });
            });
        } catch(error){
            console.log(error)
        }

    }
    useEffect(()=>{
        get_images()
    },[])

  return (
    <div className='image-container'>
        <div className='image-slider'>
            {imageUrls.map((url, index)=>{
            return (
                <div  className={count === index ? "show-image" : count - 1 === index ? "from-left" : ""} >
                    <img 
                        key={index} src={url} 
                        alt="Prject show" 
                    />
                </div>
                )
            })}
        </div>
        <div className='imgSlider-btn'>
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
