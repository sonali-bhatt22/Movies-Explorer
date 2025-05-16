import React, { useState, useEffect } from 'react'
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

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);
      console.log(data)
      //setPopular(data.results);
      if(data.results.length > 0){
        setPopular((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);

      }else{
        setHasMore(false)
      }
      
      console.log(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // yaha humne ek function bnaya hai h jisme hum getPopular func ko call kr rhe hain
  //agar popular ki length 0 hai tbhi getPopular ko call kre warna setPage(1) hi rehne de
  // ye humne is liye bnaya hai jis se ek hi page br br na aaye refresh function


  //agar popular me 0 elements hain to getpopular chlao nhi to agar category change hoti hai to
  //setPopular ko khali kro or setPage(1) ko set kro or getPopular ko cll kro

  const refreshHandler = async()=>{
    if(popular.length === 0){
        getPopular();
    }else{
        setPage(1)
        setPopular([])
        getPopular()
    }
  }

  useEffect(() => {
    //getPopular();
    refreshHandler();
  }, [category]);


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
