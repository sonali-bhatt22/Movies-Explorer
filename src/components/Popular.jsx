import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import Topnav from './Templ/Topnav'
import Dropdown from './Templ/Dropdown'
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from './Templ/Cards'

const Popular = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState("movie")
  const [popular, setPopular] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true);
  document.title = "MovieHub | Popular"

  const getPopular = useCallback(async () => {
    try {
      const { data } = await axios.get(`/${category}/popular`, {
        params: {
          page
        }
      });
      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching popular:", error.response?.data || error.message);
      setHasMore(false);
    }
  }, [category, page]);

  const refreshHandler = useCallback(async () => {
    if (popular.length === 0) {
      await getPopular();
    } else {
      setPage(1);
      setPopular([]);
      setHasMore(true);
      await getPopular();
    }
  }, [getPopular, popular.length]);

  useEffect(() => {
    refreshHandler();
  }, [refreshHandler]);

  return popular.length > 0 ? (
    <div className=" py-[1%] w-screen h-screen relative">
      <div className="w-full flex items-center justify-between mb-3 px-[3%] fixed top-0 bg-[#1F1E24] z-10">
        <h1 className=" text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>{" "}
          Popular <span className='text-sm text-zinc-500'>({category})</span>
        </h1>

        <div className="ml-20 w-[70%]">
          <Topnav />
        </div>

        <div className="flex gap-2 ">
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setCategory(e.target.value)}
          />

          
        </div>
      </div>
      <InfiniteScroll
        className="mt-[5%]"
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
      >
     
        <Cards data={popular} title={category} />
      </InfiniteScroll>
      
    </div>
  ) : (
    <h1>loading..</h1>
  );
}

export default Popular
