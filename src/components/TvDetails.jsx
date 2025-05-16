
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { aysncloadtv, removetv } from "../store/actions/tvAction";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Templ/Loading";
import { Link } from "react-router-dom";
import HorizontalCards from "./Templ/HorizontalCards";

const TvDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.tv);
  const navigate = useNavigate();
  const { pathname } = useLocation()
  useEffect(() => {
    dispatch(aysncloadtv(id));
    return () => {
      dispatch(removetv(id));
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top 2%",
        backgroundSize: "cover",
      }}
      className="w-screen h-[160vh] px-[10%] relative"
    >
      <nav className="full text-zinc-200 flex gap-10 text-xl h-[10vh] items-center ">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#6556CD]"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i class="ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i class="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      <div className="w-full flex">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5) shadow-sm shadow-[#6556CD  h-[60vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[10%] text-white flex flex-col gap-2">
            <h1 className="font-black text-4xl">
                {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
                <small className="text-xl font-semibold items-center ml-2 text-zinc-300">({info.detail.first_air_date.split("-")[0]})</small>
            </h1>
            <div className="flex items-center gap-2 font-semibold">
              <span className="text-white font-semibold bg-yellow-600 h-10 w-10 flex justify-center items-center rounded-full ">
                {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
              </span>
              <h1 className="font-bold text-xl ">User Score</h1>
              <h1>{info.detail.release_date}</h1>
              <h1>{info.detail.genres.map((g)=> g.name).join(", ")}</h1>
              
            </div>
            <h1 className=" italic font-semibold">{info.detail.tagline}</h1>
            <h1 className="text-xl font-bold ">Overview</h1>
            <p className="">{info.detail.overview}</p>

            <h1 className="text-xl font-bold">tv Translated</h1>
            <p className="tracking-tighter">{info.translations.join(", ")}</p>
            
            
            <Link to={`${pathname}/trailer`} className='bg-[#6556CD] p-4 rounded-md text-lg font-semibold w-36'>Watch Trailer</Link>
        </div>

       
      </div>
      <Outlet/>


      <div className="w-[80%] flex text-white flex-col gap-3">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-3 items-center mt-5">
            <h1>Platforms</h1>
            {info.watchproviders.flatrate.map((w, i) => {
              return (
                <img key={i}
                  title={w.provider_name}
                  className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5) shadow-sm shadow-[#6556CD] w-[5vh] h-[5vh] rounded-full object-fit "
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              );
            })}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-3 items-center">
            <h1>Available on rent</h1>
            {info.watchproviders.rent.map((w, i) => {
              return (
                <img key={i}
                  title={w.provider_name}
                  className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5) shadow-sm shadow-[#6556CD] w-[5vh] h-[5vh] rounded-full object-fit "
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              );
            })}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-3 items-center">
            <h1>Buy On</h1>
            {info.watchproviders.buy.map((w, i) => {
              return (
                <img key={i}
                  title={w.provider_name}
                  className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5) shadow-sm shadow-[#6556CD] w-[5vh] h-[5vh] rounded-full object-fit "
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              );
            })}
          </div>
        )}
      </div>
      
     
      <hr className="mt-10"/>
      <div className="mt-8">
        <h1 className="text-white font-black text-2xl">Recommended & Similar Stuff</h1>
       <HorizontalCards data = {info.recommendations ? info.recommendations : info.similar}/>
      </div>

    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
