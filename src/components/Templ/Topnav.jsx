import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from '../../utils/axios'

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([])

  const GetSearches = useCallback(async()=>{
    try {
      const {data} = await axios.get(`/search/multi?query=${query}`)
      //console.log(data)
      setSearches(data.results)
      
    } catch (error) {
      console.log("Error: ", error)
      
    }
  }, [query])
  
  useEffect(() => {
    GetSearches();
  }, [GetSearches]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setQuery(query);
    if (query.length > 0) {
        GetSearches();
    }
  };

  return (
    <>
      <div className="flex justify-start relative ml-[15%]">
        <div className="w-full h-[10vh]  flex justify-start items-center">
          <i className="ri-search-line text-2xl text-zinc-400 hover:text-[#6556CD]"></i>
          <input
          onChange={handleSearch}
          value={query}
            className="w-[50%] mx-10 p-3 text-xl outline-none bg-transparent text-white focus:outline-[#6556CD]"
            type="text"
            placeholder="search anything"
          />
          {query.length > 0 && <i onClick={()=>setQuery('')} className=" text-3xl text-zinc-400 ri-close-fill hover:text-[#6556CD]"></i>}
          
        </div>
        <div className="absolute w-[52%] max-h-[50vh] bg-zinc-200 mt-[10vh] overflow-auto rounded z-10 left-[5%]">
          {searches.map((search) => (
            <Link
                to={`/${search.media_type}/details/${search.id}`}
                key={search.id}
                className="p-2 hover:bg-zinc-900 flex items-start"
            >
                <img
                    src={search.backdrop_path || search.profile_path
                        ? `https://image.tmdb.org/t/p/w500${search.backdrop_path || search.profile_path}`
                        : `https://image.tmdb.org/t/p/w500${search.poster_path}`}
                    className="h-[100px] object-contain"
                />
                <div className="ml-4">
                    <h1 className="text-xl text-zinc-400 font-semibold">
                        {search.original_title || search.original_name || search.title || search.name}
                    </h1>
                    <p className="text-sm text-zinc-600">
                        {search.overview.slice(0, 100)}...
                    </p>
                </div>
            </Link>
          ))}
          
        </div>
      </div>
    </>
  );
};

export default Topnav;
