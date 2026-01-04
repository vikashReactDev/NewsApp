import React, { useEffect } from 'react'
import Wrapper from '../Component/Wrapper'
import Loder from '../Component/Loder.jsx'
import { useNewsContext } from '../Context/NewsContext'

const News = ({className}) => {
    const {news,setnews,fetchNews,loading} = useNewsContext();

    useEffect(() => {
        (async ()=>
         {
            const data = await fetchNews();
            setnews(data.articles);
            console.log("News Data",data);
         }
        )()
    }, []);

    if(loading) return <Loder className={'w-fit m-auto py-24 mb-32'}/>;

  return (
    
      <Wrapper>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
          {
             news.map((article, index) => {
                if(!article.urlToImage) return null;
                return (    
              <NewsCard key={index} article={article} />
                )
            }) 

          }

       </div>
        </Wrapper>  

  )
}

const NewsCard = ({ article }) => {
  return (
    <>  
    <div className="card bg-base-200 shadow-sm">
  <figure>
    <img
      className='w-full aspect-video object-contain'
      src={article?.urlToImage}
      alt="Image Not found" />
  </figure>
  <div className="card-body">
    <h2 className="card-title line-clamp-2">{article?.title}</h2>
    <p className="line-clamp-3">{article?.description}</p>
    <div className="card-actions justify-end">
      <button className="btn badge-outline" onClick={()=> window.open(article?.url)}>Read More</button>
    </div>
  </div>
</div>
    </>
    )
}

export default News
