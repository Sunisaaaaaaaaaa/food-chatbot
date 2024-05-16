import React, { useState } from 'react'
import SlotMach from './SlotMach'

function Slot({number}) {
  const [showSlot, setShowSlot] = useState(false)


  const handleOnData = (data) => {
    const message = [{content : 'เลขนำโชคของคุณคือ', type : 'user'}]
    const randomIndex = Math.floor(Math.random() * message.length)

    const concat = parseInt(data.join(''), 10)
    const numInt32 = concat & 0xFFFFFFFF
    number([message[randomIndex], {content : String(numInt32), type: 'user'}])
  }

  const toggleSlot = ()=> {
    setShowSlot(!showSlot)
  }

  return (
    <div className='flex'>
  <button id='bot' onClick={toggleSlot} className='border-2 border-black rounded-2xl bg-[#F9E8D9] py-1 w-60 hover:bg-white'>
    <div className='flex flex-col items-center'>
    <img src='/slot-machine.png' className='w-20'/>
    </div>
    <p className='text-sm'>เมนูจากเลขนำโชค</p>
  </button>
  {showSlot && <SlotMach onClose={() => setShowSlot(false)} onData={handleOnData}/>}
  </div>
  )
}

export default Slot