import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Topnav from "./Templ/Topnav";
import Dropdown from "./Templ/Dropdown";
import axios from "../utils/axios";
import Cards from "./Templ/Cards";
import Loading from "./Templ/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {
  
  const Navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true)
  document.title = "MovieHub | Trending"
  const getTrending = async () => {
    try {
      const nextPage = page;
      const { data } = await axios.get(`trending/${category}/${duration}?page=${nextPage}`);

      //setTrending(data.results);
      if(data.results.length > 0){
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage((prevPage)=> prevPage + 1);

      }else{
        setHasMore(false)
      }
      
      console.log(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = async()=>{
    if(trending.length === 0){
        getTrending();
    }else{
        setPage(1)
        setTrending([])
        setHasMore(true)
        getTrending()
    }
  }

  useEffect(() => {
    //getTrending();
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className=" py-[1%] w-screen h-screen relative">
      <div className="w-full flex items-center justify-between mb-3 px-[3%] fixed top-0 bg-[#1F1E24] z-10">
        <h1 className=" text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => Navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>{" "}
          Trending <span className='text-sm text-zinc-500'>({category})</span>
        </h1>

        <div className="ml-20 w-[70%]">
          <Topnav />
        </div>

        <div className="flex gap-2 ">
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setCategory(e.target.value)}
          />

          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        className="mt-[5%]"
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
      >
     
        <Cards data={trending} title={category} />
      </InfiniteScroll>
      
    </div>
  ) : (
    <h1>loading..</h1>
  );
}

export default Trending;
