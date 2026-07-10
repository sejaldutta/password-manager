import React from 'react'

const Footer = () => {
  return (
    <div className='bg-purple-950 flex justify-between items-center text-white'>
        <p className='p-1'>Copyright &copy; 2024 Password Manager. All rights reserved.</p>
    
        <div className='logo text-xl '>
          <span className="text-purple-600 text-2xl">&lt;</span>
          Password Man<span className="text-purple-500">ager</span>
          <span className="text-purple-600 text-2xl">/ &gt;</span>
          </div>
    </div>
  )
}

export default Footer