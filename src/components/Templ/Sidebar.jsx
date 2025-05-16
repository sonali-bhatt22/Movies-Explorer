import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div>
      <div className=" h-full border-r-2 border-zinc-200 p-7 overflow-y-auto">
        <h1 className="text-2xl">
          <i className="ri-tv-fill text-[#6556CD] mr-2"></i>
          <span className="text-white text-3xl font-black">SMDB</span>
        </h1>
        <nav className="flex flex-col text-zinc-400 text-xl gap-1">
          <h1 className="text-white font-semibold text-xl mt-7 mb-3">
            New Feeds
          </h1>
          <Link to='/trending' className="hover:bg-[#6556CD] hover:text-white p-4 rounded-md duration-300">
            <i className="ri-fire-fill mr-2"></i>Trending
          </Link>
          <Link to='/popular' className="hover:bg-[#6556CD] hover:text-white p-4 rounded-md duration-300">
            <i className="ri-bard-fill mr-2"></i>Popular
          </Link>
          <Link to='/movie' className="hover:bg-[#6556CD] hover:text-white p-4 rounded-md duration-300">
            <i className="ri-movie-2-fill mr-2"></i>Movies
          </Link>
          <Link to='/tv' className="hover:bg-[#6556CD] hover:text-white p-4 rounded-md duration-300">
            <i className="ri-tv-2-fill mr-2"></i>TV Shows
          </Link>
          <Link to='/person' className="hover:bg-[#6556CD] hover:text-white p-4 rounded-md duration-300">
            <i className="ri-team-fill mr-2"></i>People
          </Link>
        </nav>
        <hr className="border-none h-[1px] bg-zinc-400 mt-2" />
        <nav className="flex flex-col text-zinc-400 text-xl gap-1">
          <h1 className="text-white font-semibold text-xl mt-7 mb-5">
            Website Information
          </h1>
          <Link className="hover:bg-[#6556CD] hover:text-white p-4 rounded-md duration-300">
            <i className="ri-fire-fill mr-2"></i>About
          </Link>
          <Link className="hover:bg-[#6556CD] hover:text-white p-4 rounded-md duration-300">
            <i className="ri-bard-fill mr-2"></i>Contact
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
