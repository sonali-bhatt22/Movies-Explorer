import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  console.log(title);
  return (
    <div className="flex flex-wrap  w-[full] bg-[#1F1E24] px-[3%]">
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`}
          className="w-[27vh] mr-[3%] mb-[2%] max-h-[50vh] relative rounded-2xl"
          key={i}
        >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5) shadow-sm shadow-[#6556CD] w-[27vh] h-[40vh] object-cover "
            src={`https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            }`}
            alt=""
          />

          <h1 className="text-zinc-400 font-semibold mt-3 text-base">
            {c.title || c.name || c.original_name || c.original_title}
          </h1>
          {c.vote_average ? (
            <div className="text-white font-semibold bg-yellow-600 h-10 w-10 flex justify-center items-center rounded-full absolute bottom-[20%] right-[-10%]">
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          ) : (
            []
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
