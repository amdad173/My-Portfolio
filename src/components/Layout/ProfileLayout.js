import React from 'react'
import Manu from './Manu'

const ProfileLayout = ({children}) => {
  return (
    <div>
        <Manu/>
        <main>
            {children}
        </main>
    </div>
  )
}

export default ProfileLayout