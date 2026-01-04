import React from 'react'

const Loder = ({className}) => {
  return (
<>
<div className={`${className}`}>
  <div className={`w-32 h-32 relative flex items-center justify-center`}>
<div className="text-center">
  <div
    className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
  ></div>
  <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
  <p className="text-zinc-600 dark:text-zinc-400">
    Your News is about to begin
  </p>
</div>
</div>
</div>
</>

  )
}

export default Loder
