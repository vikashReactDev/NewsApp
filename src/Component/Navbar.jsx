import React, { useState, useEffect, useRef } from "react";
import Wrapper from "./Wrapper";
import { useNewsContext } from "../Context/NewsContext";

const Navbar = ({ className }) => {
  const { setnews, fetchNews, fetchTopHeadlines } = useNewsContext();

  const [isOpen, setIsOpen] = useState(false);
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const timer = useRef(null);

  
  const handelChange = (e) => {
    const search = e.target.value;

    if (!search) return;

    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const data = await fetchNews(`/everything?q=${search}`);
      setnews(data?.articles || []);
    }, 1000);
  };

  
  useEffect(() => {
    if (!isOpen) return;

    

    const getTopHeadlines = async () => {
      setLoading(true);
      try {
        const data = await fetchTopHeadlines(`/top-headlines?country=us`);
        setHeadlines(data?.articles || []);
      } catch (error) {
        console.error("Error fetching headlines:", error);
      } finally {
        setLoading(false);
      }
    };

    getTopHeadlines();
  }, [isOpen, fetchTopHeadlines]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);
  

  return (
    <>
    
      <div className={`bg-base-200 ${className}`}>
        <Wrapper>
          <div className="navbar shadow-sm">
            <div className="flex-1">
              <a className="btn btn-ghost text-xl">VBNews</a>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-full md:w-auto"
                onChange={handelChange}
              />

    
              <button
                className="btn btn-ghost btn-circle"
                onClick={() => setIsOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Wrapper>
      </div>

        {/* Side Panel for Top Headlines */}
      <div
        className={`fixed top-0 right-0 h-full 
        w-full sm:w-80 
        bg-base-100 shadow-lg z-50
        transform transition-transform duration-300
        ${
          isOpen
            ? "translate-x-0"
            : "translate-x-[100vw] sm:translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">Top Headlines</h2>
          <button
            className="btn btn-sm btn-circle"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-60px)]">
          {loading && (
            <p className="text-sm text-gray-400">Loading...</p>
          )}

          {!loading && headlines.length === 0 && (
            <p className="text-sm text-gray-400">
              No headlines found
            </p>
          )}

          {!loading &&
            headlines.map((news, index) => (
              <div key={index} className="border-b pb-2">
              <a href={news.url} target="_blank" rel="noopener noreferrer" className="lnk link-hover ">
                <p className="text-sm font-semibold">
                  {news.title}
                </p>
                </a>
              </div>
            ))}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
