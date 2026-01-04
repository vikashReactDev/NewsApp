import React from 'react'
import Wrapper from './Wrapper';
import { useNewsContext } from '../Context/NewsContext.jsx';

const Category = ({className}) => {
    const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
     const {setnews, fetchNews} = useNewsContext();
    const handleClickCategory = async (e) => {
        const cat = e.target.value
        const data =await fetchNews(`/everything?q=${cat}`);
        setnews(data.articles);
        console.log("check cate",cat);
    }

   return (
         <div className={`bg-base-200 ${className}`}>
           <Wrapper>
            <div className="flex flex-nowrap justify-start gap-4 py-4 shadow-sm overflow-x-auto hide-scrollbar md:overflow-x-visible md:justify-center">
        {   
            categories.map((category)=> {
                return (
                    <button key={category} onClick={handleClickCategory} value={category} className='btn btn-primary'>{category}</button>
                )
            })
        }
    </div>
    </Wrapper>
    </div>
   
  )
}

export default Category
