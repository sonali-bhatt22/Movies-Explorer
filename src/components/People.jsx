import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import Topnav from './Templ/Topnav'

import InfiniteScroll from "react-infinite-scroll-component";
import Cards from './Templ/Cards'
import Loading from './Templ/Loading'

const People = () => {
  const navigate = useNavigate()
  const [people, setPeople] = useState([])
  const [category] = useState('popular')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true);
  document.title = "peopleHub | peoples"
  
  const getPeople = useCallback(async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      console.log(data)
      //setpeople(data.results);
      if(data.results.length > 0){
        setPeople((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);

      }else{
        setHasMore(false)
      }
      
      console.log(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }, [category, page]);

  const refreshHandler = useCallback(async () => {
    if (people.length === 0) {
        await getPeople();
    } else {
        setPage(1)
        setPeople([])
        await getPeople()
    }
  }, [getPeople, people.length]);

  useEffect(() => {
    refreshHandler();
  }, [refreshHandler]);
  return people.length > 0 ? (
    <div className=" py-[1%] w-screen h-screen relative">
      <div className="w-full flex items-center justify-between mb-3 px-[3%] fixed top-0 bg-[#1F1E24] z-10">
        <h1 className=" text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>{" "}
          people <span className='text-sm text-zinc-500'>({category})</span>
        </h1>

        <div className="ml-20 w-[70%] ">
          <Topnav />
        </div>

        
      </div>
      <InfiniteScroll
        className='mt-[5%]'
        dataLength={people.length}
        next={getPeople}
        hasMore={hasMore}
      >
     
        <Cards data={people} title="person" />
      </InfiniteScroll>
      
    </div>
  ) : <Loading/>
}

export default People
