import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Topnav from './Templ/Topnav';
import Dropdown from './Templ/Dropdown';
import Cards from './Templ/Cards';
import Loading from './Templ/Loading';

function Trending() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('all');
  const [duration, setDuration] = useState('day');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Load initial data when filters change
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setInitialLoading(true);
    fetchMovies(1, false);
  }, [category, duration]);

  // Manual scroll handler for infinite loading
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentHeight = window.innerHeight + window.scrollY;
      
      if (currentHeight + 200 >= scrollHeight && !loading && !initialLoading) {
        fetchMoreMovies();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, initialLoading]);

  const fetchMovies = async (pageNum, append = true) => {
    try {
      setLoading(true);
      
      const { data } = await axios.get(`/trending/${category}/${duration}`, {
        params: { page: pageNum }
      });
      
      if (data.results && data.results.length > 0) {
        if (append) {
          setMovies(prev => [...prev, ...data.results]);
        } else {
          setMovies(data.results);
        }
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const fetchMoreMovies = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage, true);
  };

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen pb-20 bg-[#1F1E24]">
      {/* Fixed header */}
      <div className="w-full flex items-center justify-between px-[3%] py-4 fixed top-0 bg-[#1F1E24] z-10">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer"></i>{" "}
          Trending <span className="text-sm text-zinc-500">({category})</span>
        </h1>
        <div className="ml-20 w-[70%]">
          <Topnav />
        </div>
        <div className="flex gap-2">
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

      {/* Main content with proper spacing */}
      <div className="pt-24 px-4">
        <Cards data={movies} title={category} />
        
        {loading && (
          <div className="flex justify-center py-6 mt-4">
            <div className="w-10 h-10 border-4 border-t-4 border-[#6556CD] rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Trending;
