import React, { useEffect, useState } from "react";
import Wrapper from "../Component/Wrapper";
import Loder from "../Component/Loder.jsx";
import { useNewsContext } from "../Context/NewsContext";

const News = ({ className }) => {
  const { news, setnews, fetchNews, loading,currentPage,setCurrentPage } = useNewsContext();

  
  const itemsPerPage = 9;

  useEffect(() => {
    (async () => {
      const data = await fetchNews();
      setnews(data.articles || []);
      console.log("News Data", data);
    })();
  }, []);

  if (loading)
    return <Loder className="w-fit m-auto py-24 mb-32" />;


  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = news.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Wrapper>
      
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
      >
        {currentNews.map((article, index) => {
          if (!article.urlToImage) return null;
          return <NewsCard key={index} article={article} />;
        })}
      </div>

      
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Wrapper>
  );
};

export default News;



const NewsCard = ({ article }) => {
  return (
    <div className="card bg-base-200 shadow-sm">
      <figure>
        <img
          className="w-full aspect-video object-contain"
          src={article?.urlToImage}
          alt="Image Not Found"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title line-clamp-2">
          {article?.title}
        </h2>

        <p className="line-clamp-3">
          {article?.description}
        </p>

        <div className="card-actions justify-end">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => window.open(article?.url, "_blank")}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};



const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-10 mb-10 flex-wrap">
      
      <button
        className="btn btn-sm"
        disabled={currentPage === 1}
        onClick={() => {
          setCurrentPage(currentPage - 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Prev
      </button>

    
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            className={`btn btn-sm ${
              currentPage === page ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {page}
          </button>
        );
      })}

      
      <button
        className="btn btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => {
          setCurrentPage(currentPage + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Next
      </button>
    </div>
  );
};

