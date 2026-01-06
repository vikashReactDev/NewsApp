import React from "react";
import Wrapper from "./Wrapper";
import {FaTwitter, FaYoutube, FaFacebook} from "react-icons/fa";
import { useNewsContext } from "../Context/NewsContext.jsx";

const Footer = () => {
  const { fetchNews, setnews,setCurrentPage } = useNewsContext();

  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const handleClickCategory = async (category) => {
    try {
      const data = await fetchNews(`/everything?q=${category}`);
      setnews(data?.articles || []);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <footer className="bg-base-200 text-base-content px-4 py-8">
        
      
        <div className="flex flex-col items-center gap-6">
          <nav className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleClickCategory(category)}
                className="link link-hover capitalize"
              >
                {category}
              </button>
            ))}
          </nav>

          
          <div className="flex gap-6 text-2xl">
            <FaTwitter className="cursor-pointer hover:text-primary transition" />
            <FaYoutube className="cursor-pointer hover:text-red-500 transition" />
            <FaFacebook className="cursor-pointer hover:text-blue-600 transition" />
          </div>
          
          <p className="text-sm text-center opacity-70">
            © {new Date().getFullYear()} — All rights reserved by{" "}
            <span className="font-semibold">Baghel Vikash</span>
          </p>
        </div>
      </footer>
    </Wrapper>
  );
};

export default Footer;
