import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import Topnav from './Templ/Topnav'
import Dropdown from './Templ/Dropdown'
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from './Templ/Cards'
import Loading from './Templ/Loading'

const Tvshows = () => {
    const navigate = useNavigate()
  const [category, setCategory] = useState("airing_today")
  const [tvShows, setTvShows] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true);
  document.title = "tvShowsHub | tvShowss"
  
  const getTvShows = useCallback(async () => {
    try {
      const { data } = await axios.get(`tv/${category}?page=${page}`);
      console.log(data)
      //settvShows(data.results);
      if(data.results.length > 0){
        setTvShows((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);

      }else{
        setHasMore(false)
      }
      
      console.log(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }, [category, page]);


  const refreshHandler = useCallback(async()=>{
    if(tvShows.length === 0){
        await getTvShows();
    }
  }, [getTvShows, tvShows.length]);

  useEffect(() => {
    //gettvShows();
    refreshHandler();
  }, [refreshHandler]);

  return tvShows.length > 0 ? (
    <div className=" py-[1%] w-screen h-screen relative">
      <div className="w-full flex items-center justify-between mb-3 px-[3%] fixed top-0 bg-[#1F1E24] z-10">
        <h1 className=" text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>{" "}
          TV Shows <span className='text-sm text-zinc-500'>({category})</span>
        </h1>

        <div className="ml-20 w-[65%]">
          <Topnav />
        </div>

        <div className="flex gap-2 ">
          <Dropdown
            title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setCategory(e.target.value)}
          />

          
        </div>
      </div>
      <InfiniteScroll
        className="mt-[5%]"
        dataLength={tvShows.length}
        next={getTvShows}
        hasMore={hasMore}
      >
     
        <Cards data={tvShows} title='tv' />
      </InfiniteScroll>
      
    </div>
  ) : <Loading/>
}

export default Tvshows
