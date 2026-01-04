import React, { Children } from 'react'

const Wrapper = ({ children }) => {
  return (
    <div className='max-h-7xl m-auto'>
      {children}
    </div>
  )
}

export default Wrapper
