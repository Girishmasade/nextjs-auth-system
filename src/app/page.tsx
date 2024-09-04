import React from 'react'
import Navbar from './navbar/page'

function page() {
  return (
    <div>
      <Navbar/>
    <div className="text-center align-center relative top-56">
      <h1 className='text-5xl'>Welcome to Home page</h1>
      <p className='py-7'>This is the Nextjs Auth system</p>
    </div>
    </div>
  )
}

export default page
