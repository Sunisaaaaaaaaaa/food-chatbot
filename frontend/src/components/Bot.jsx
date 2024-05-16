import React, { useState } from 'react'


function Bot( {greeting, clicked} ) {

  const handleOnClick = () => {
    const greetingFromBot = [{content : 'หรือจะถามเป็นคำถามก็ได้เช่น "อยากกินอะไรเบาๆ" ', type : 'bot'},
    {content : 'หรือจะถามเป็นคำถามก็ได้เช่น "อยากกินของทอด"', type : 'bot'},
    {content : 'หรือจะถามเป็นคำถามก็ได้เช่น "อยากกินอะไรที่เผ็ด"', type : 'bot'}]

    const randomIndex = Math.floor(Math.random() * greetingFromBot.length)
    const randomGreeting = [{content : 'คุณสามารถขอเมนูได้โดยการพิมพ์ว่าจะเอา "ข้าว" หรือ "เส้น"   😄😃😀', type : 'bot'}]
    
    randomGreeting.push(greetingFromBot[randomIndex])
    // console.log(randomGreeting)
    // Call the callback function provided by the parent component
    greeting(randomGreeting)
    clicked()
  }

  return (
    <div className='flex'>
    <button id='bot' className='items-center border-2 border-black rounded-2xl bg-[#F9E8D9] py-1 w-60 hover:bg-white'
    onClick={handleOnClick}
    >
      <div className='flex flex-col items-center'>
      <img src='/robot.png' className='w-20'/>
      <p className='text-sm'>คุยกับบอท</p>
      </div>
 
    </button>
    </div>
  )
}

export default Bot