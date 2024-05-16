import React from 'react'

function Popular( {pop} ) {

  const handleOnClick = () => {
    const message = [{content: 'ขอเมนูอาหารยอดนิยม', type : 'user'}, {content: 'อาหารยอดนิยมช่วงนี้', type : 'user'}]
    const randomIndex = Math.floor(Math.random() * message.length)

    pop([message[randomIndex]])
  }
  return (
    <div className='flex'>
      <button id='pop' onClick={handleOnClick} className='border-2 border-black rounded-2xl bg-[#F9E8D9] py-1 w-60 hover:bg-white'>
        <div className='flex flex-col items-center'>
        <img src='/charisma.png' className='w-20' />
        </div>
        <p className='text-sm'>เมนูยอดนิยม</p>
      </button>
      
    </div>

  )
}

export default Popular