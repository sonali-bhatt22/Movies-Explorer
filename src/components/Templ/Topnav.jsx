import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from '../../utils/axios'
import noimage from '/noimage.jpg'

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([])

  const GetSearches = async()=>{
    try {
      const {data} = await axios.get(`/search/multi?query=${query}`)
      //console.log(data)
      setSearches(data.results)
      
    } catch (error) {
      console.log("Error: ", error)
      
    }
  }
  
  useEffect(()=>{


    GetSearches()
  }, [query])
  return (
    <>
      <div className="flex justify-start relative ml-[15%]">
        <div className="w-full h-[10vh]  flex justify-start items-center">
          <i className="ri-search-line text-2xl text-zinc-400 hover:text-[#6556CD]"></i>
          <input
          onChange={(e)=>{setQuery(e.target.value)}}
          value={query}
            className="w-[50%] mx-10 p-3 text-xl outline-none bg-transparent text-white focus:outline-[#6556CD]"
            type="text"
            placeholder="search anything"
          />
          {query.length > 0 && <i onClick={()=>setQuery('')} className=" text-3xl text-zinc-400 ri-close-fill hover:text-[#6556CD]"></i>}
          
        </div>
        <div className="absolute w-[52%] max-h-[50vh] bg-zinc-200 mt-[10vh] overflow-auto rounded z-10 left-[5%]">
          {searches.map((s, i)=>{
            return <Link to={`/${s.media_type}/details/${s.id}`} className="hover:text-black hover:bg-zinc-300 duration-200 font-semibold text-zinc-600 w-[100%]  p-5 flex justify-start items-center border-b-2 border-zinc-100">

              <img className="w-20 h-20 object-cover mr-5 rounded shadow-lg" src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}` : noimage} alt="" />
              <span>{s.name || s.title || s.original_name || s.original_title}</span>
            </Link>
          
          })}
          
        </div>
      </div>
    </>
  );
};

export default Topnav;
