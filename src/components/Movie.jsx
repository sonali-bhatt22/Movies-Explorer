import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import Topnav from './Templ/Topnav'
import Dropdown from './Templ/Dropdown'
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from './Templ/Cards'
import Loading from './Templ/Loading'

const Movie = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState("now_playing")
  const [movie, setMovie] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true);
  document.title = "MovieHub | Movies"
  
  const getMovie = useCallback(async () => {
    try {
      const { data } = await axios.get(`movie/${category}?page=${page}`);
      console.log(data)
      //setmovie(data.results);
      if(data.results.length > 0){
        setMovie((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);

      }else{
        setHasMore(false)
      }
      
      console.log(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }, [page, category]);

  const refreshHandler = useCallback(async () => {
    if(movie.length === 0){
        await getMovie();
    }else{
        setPage(1)
        setMovie([])
        await getMovie()
    }
  }, [getMovie, movie.length]);

  useEffect(() => {
    //getmovie();
    refreshHandler();
  }, [refreshHandler]);


  return movie.length > 0 ? (
    <div className=" py-[1%] w-screen h-screen relative ">
      <div className="w-full flex items-center justify-between mb-3 px-[3%] fixed top-0 bg-[#1F1E24] z-10">
        <h1 className=" text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>{" "}
          Movie <span className='text-sm text-zinc-500'>({category})</span>
        </h1>

        <div className="ml-20 w-[70%] ">
          <Topnav />
        </div>

        <div className="flex gap-2 ">
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setCategory(e.target.value)}
          />

          
        </div>
      </div>
      <InfiniteScroll
        className='mt-[5%]'
        dataLength={movie.length}
        next={getMovie}
        hasMore={hasMore}
      >
     
        <Cards data={movie} title='movie' />
      </InfiniteScroll>
      
    </div>
  ) : <Loading/>
}

export default Movie
