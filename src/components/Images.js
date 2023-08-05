import React, { useEffect, useState } from 'react'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../config/firebase'

const Images = ({folder}) => {
    const [imageUrls, setImageUrls] = useState([])

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
    <div>
        {imageUrls.map((url, index)=>{
           return <img src={url} key={index} alt="projet image" />
        })}
    </div>
  )
}

export default Images
