import React from 'react'

const Loder = ({className}) => {
  return (
<>
<div className={` ${className}`}>
  <div className={`w-32 h-32 relative flex items-center justify-center`}>


<div className="flex items-center space-x-2">
  <div className="animate-pulse rounded-full bg-gray-500 h-12 w-12 rounded-full"></div>
  <div className="space-y-2">
    <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[200px]"> </div>
    <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[170px]"> </div>
  </div>
</div>
    

</div>
</div>
</>

  )
}

export default Loder
