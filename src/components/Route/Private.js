import React, { useEffect, useState } from 'react'
import { useAuth } from "../../context/AuthContext"
import { Outlet } from 'react-router-dom'
import Looding from '../Looding'

const Private = () => {
    const [user] = useAuth()
    const [ok, setOk] = useState(false)

    useEffect(()=>{
        user? setOk(true): setOk(false)
    },[user])

  return ok? <Outlet/>: <Looding/>

}

export default Private