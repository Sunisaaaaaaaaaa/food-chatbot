import React, { useState } from 'react'
import Slot from './Slot'
import Bot from './Bot'
import Popular from './Popular'
import Weather from './Weather'

function AllFunction({onData}) {
  const [botData, setBotData] = useState(null)
  const [slotData, setSlotData] = useState(null)

    // Callback function to receive data from Bot
    const handleBotData = (data) => {
      // Process the data received from Bot
      // console.log('Data received from Bot:', data)
      setBotData(data)
    // Pass the data to the parent (Chat) using the provided callback
      onData(data)
    }

    const handleSlotData = (data) => {
      setSlotData(data)
      onData(data)
    }

  return (
    <div className='grid grid-cols-2 items-center justify-center gap-1.5 mt-3'>
    <Bot greeting={handleBotData}/>
    <Popular />
    <Weather />
    <Slot number={handleSlotData}/>
    </div>
  )
}

export default AllFunction