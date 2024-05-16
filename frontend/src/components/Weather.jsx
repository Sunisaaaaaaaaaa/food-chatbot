import React from 'react'


function Weather({ onClick }) {
  
  return (
    <div className='flex'> 
      <button id='weather' onClick={onClick} className='border-2 border-black rounded-2xl bg-[#F9E8D9] py-1 w-60 hover:bg-white'>
        <div className='flex flex-col items-center'>
          <img src='/meteorology.png' className='w-20'/>
        </div>
        <p className='text-sm'>เมนูตามสภาพอากาศ</p>
      </button>
    </div>
  )
}

export default Weather