import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  if (!data || data.length === 0) {
    return <div className="text-center text-white py-10">No results found</div>;
  }

  return (
    <div className="flex flex-wrap justify-start gap-4 w-full">
      {data.map((item, index) => (
        <Link 
          to={`/${item.media_type || title}/details/${item.id}`}
          className="w-[200px] mb-6 relative rounded-lg overflow-hidden transition-transform hover:scale-105"
          key={`${item.id}-${index}`}
        >
          {(item.poster_path || item.backdrop_path || item.profile_path) ? (
            <img
              className="w-full h-[300px] object-cover rounded-lg shadow-lg"
              src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path || item.profile_path}`}
              alt={item.title || item.name || "Movie"}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-[300px] bg-gray-800 flex items-center justify-center rounded-lg shadow-lg">
              <span className="text-gray-400 text-center p-4">No Image Available</span>
            </div>
          )}

          <h1 className="text-zinc-200 font-semibold mt-2 text-base truncate px-1">
            {item.title || item.name || item.original_name || item.original_title}
          </h1>
          
          {item.vote_average && (
            <div className="absolute top-2 right-2 text-white font-semibold bg-yellow-600 h-8 w-8 flex justify-center items-center rounded-full text-sm">
              {Math.round(item.vote_average * 10)}<sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
