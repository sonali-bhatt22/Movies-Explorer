import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player'
import Notfound from './Notfound'
import { Link } from 'react-router-dom'

const Trailer = () => {
  const {pathname} = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state)=> state[category].info.videos)
  console.log(ytvideo)
  const navigate = useNavigate()

  return  (
    <div className='absolute top-0 z-[100] flex justify-center overflow-y-hidden   right-2 w-screen h-[160vh] bg-[rgba(0,0,0,0.8)] '>
        <Link
          onClick={() => navigate(-1)}
          className="ri-close-fill font-bold z-[100] text-white hover:text-[#6556CD] absolute top-[5%] right-[5%]"
        ></Link>
        
         {ytvideo ? (<ReactPlayer height={600} width={1000} url={`https://www.youtube.com/watch?v=${ytvideo.key}`}/>) : <Notfound/>}   
    </div>
  )
}

export default Trailer
