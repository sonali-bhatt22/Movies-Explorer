import React from 'react'
import loader from  '/loader.gif'
const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
      <img className='w-[40%] h-[50%]' src={loader} alt="" />
    </div>
  )
}

export default Loading
