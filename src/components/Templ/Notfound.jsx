import React from 'react'
import notfound from '../../../public/notfound.gif'

const Notfound = () => {
  return (

    <div className=' w-full h-full flex justify-center bg-black '>
          <img className=' h-[50%] object-cover ' src={notfound} alt="" />
    </div>
  )
}

export default Notfound
