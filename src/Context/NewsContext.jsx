import React, { useState } from 'react'
import { useContext } from 'react';
import api from '../Config/axios';

import { createContext } from 'react'

const NewsContext = createContext();

const NewsProvider = ({ children }) => {
    const [news, setnews] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [currentPage, setCurrentPage] = useState(1)

    const fetchNews = async (url='/everything?q=india') => {
        setLoading(true);
        try {
            
            const res = await api.get(`${url}&apiKey=${import.meta.env.VITE_NEWS_API}`);
            setLoading(false);
             return res.data;

        }
        catch (error) {
            console.log("Error while fetching news data", error);
            setLoading(false);
        }
    }
    
    const fetchTopHeadlines = async (url='/top-headlines?country=in') => {
        try {
            const res = await api.get(`${url}&apiKey=${import.meta.env.VITE_NEWS_API}`);
             return res.data;
        }
        catch (error) {
            console.log("Error while fetching news data", error);
        }
    }
    const value = {
        news,
        setnews,
        fetchNews,
        fetchTopHeadlines,
        loading,
        setLoading,
        currentPage,
        setCurrentPage,
    }


    return (
        <NewsContext.Provider value={value}>
            {children}
        </NewsContext.Provider>
    )
}

const useNewsContext = () => {
    return useContext(NewsContext);

}

export { NewsProvider, useNewsContext }



