import React, {useState, useEffect, use } from 'react'
import Sidebar from './Templ/Sidebar'
import { Link } from 'react-router-dom'
import Topnav from './Templ/Topnav'
import axios from '../utils/axios'
import Header from './Templ/Header'
import HorizontalCards from './Templ/HorizontalCards'
import Dropdown from './Templ/Dropdown'
import Loading from './Templ/Loading'

function Home() {
    document.title = "MovieHub | Homepage"
    const [wallpaper, setWallpaper] = useState(null)
    const [trending, setTrending] = useState(null)
    const [category, setCategory] = useState("all")

    //getting wallpaper on home page
 
    const getHeaderWallpaper = async () =>{
      try {
        const {data} = await axios.get(`trending/all/day`)
        let randomdata = data.results[(Math.random()*data.results.length).toFixed()]
        setWallpaper(randomdata);
        
      } catch (error) {
        console.log("Error: ", error)
      }
    }
    
    //getting trendings

    const getTrending = async () =>{
      try {
        const {data} = await axios.get(`trending/${category}/day`)

        
        setTrending(data.results);
        //console.log(data)
        
      } catch (error) {
        console.log("Error: ", error)
      }
    }
    
    //calling getHeaderWallpaper and getTrending

    useEffect(()=>{
      !wallpaper && getHeaderWallpaper();
      getTrending();

    }, [category])

    
  return wallpaper && trending ? (
    <div className='w-full h-full flex overflow-hidden'>
      <div className='w-[20%]'>
        <Sidebar/>
      </div>
       <div className='w-[80%] h-full overflow-y-auto '>
        <div className='fixed top-0 bg-[#1F1E24] w-full'>
         <Topnav/>
        </div>
        <div className='mt-[5%]'>
        <Header data={wallpaper}/>
         <div className="mb-5 flex justify-between items-center m-4">
                <h1 className="text-3xl font-semibold text-zinc-500">Trending</h1>
                <Dropdown  title="Filter" options={['tv', 'movie', 'all']} func={(e)=>setCategory(e.target.value)} />
                
         </div>
        <HorizontalCards data = {trending} func={setCategory}/>
        </div>

     </div>
    </div>
    
  ) : <Loading/>
}

export default Home
