import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Header = ({data}) => {
   
   console.log(pathname)
     const {pathname} = useLocation();
     const category = pathname.includes("movie") ? "movie" : "tv";
  
    //console.log(data)
  return (
    <div style={{
        background: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${ data.backdrop_path || data.profile_path })`,
        backgroundPosition: "top 2%",
        backgroundSize: 'cover'
    }} className='w-full h-[50vh]  p-[8%]  flex items-end'>
      <div className='  text-white w-[70%]'>
        <h1 className='text-2xl  font-black  '>{data.title || data.name || data.original_name || data.original_title}</h1>
        <p className='ansolute bottom-2'>{data.overview.slice(0, 200)}<Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-400'> more...</Link></p>
        <p className='mt-3 mb-10'>
         <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}{data.release_date || "No Info"}
         <i className="text-yellow-500 ri-album-fill ml-5 "></i>{" "}{data.media_type.toUpperCase()}
        </p>
        
        <Link to={`${category}/trailer`} className='bg-[#6556CD] p-4 rounded-md text-lg font-semibold'>Watch Trailer</Link>

      </div>
      
    </div>
  )
}

export default Header
