import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data }) => {
  console.log(data)
  return (
    <div className="w-full p-5">
     
      <div className="w-full h-[35vh] flex overflow-x-auto overflow-y-hidden text-white cursor-pointer">
        {data.map((d, i) => (
         <Link to={`/${d.media_type}/details/${d.id}`} key={i} className="min-w-[15%] mr-5 bg-zinc-900 h-[40vh] mb-5 shadow-sm shadow-[#6556CD]">
            <img
              className="h-[40%] w-full object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                d.backdrop_path || d.poster_path
              }`}
              alt=""
            />

            <div className="p-2">
              <h1 className="text-lg  font-semibold  tracking-tight leading-tight mb-1">
                {d.title || d.name || d.original_name || d.original_title}
              </h1>
              <p className="ansolute bottom-2 tracking-tight text-sm text-zinc-300 font-semibold">
                {d.overview.slice(0, 50)}...
                <span className="text-blue-400 cursor-pointer">more</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;

