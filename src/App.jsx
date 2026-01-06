import React from 'react'
import Navbar from './Component/Navbar'
import Footer from './Component/Footer'
import News from './Pages/News'
import Category from './Component/Category'

const App = () => {
  return (
    <div>
      <Navbar className={`sticky top-0 z-20`}/>
        <Category className="py-6 sticky top-14 z-10 bg-base-100"/>
        <News className={'pb-10'} />
      <Footer/>
    </div>
  )
}

export default App
