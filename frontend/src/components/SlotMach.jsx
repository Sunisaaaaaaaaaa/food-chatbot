import React, { useEffect, useState } from 'react'

function SlotMach({isOpen, onClose, onData}) {
  const [isSpinning, setIsSpinning] = useState(false)

  const symbols = [1,2,3,4,5,6,7,8,9]
  const [reels, setReels] = useState([symbols[0], symbols[0], symbols[0]])

  const spinReels = () => {
    const newReels = reels.map(() => symbols[Math.floor(Math.random() * symbols.length)]);
    setReels(newReels)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      spinReels()
      setIsSpinning(true) // Set spinning to true when spinning starts
    }, 100)

    setTimeout(() => {
      setIsSpinning(false) // Set spinning to false when spinning stops
      clearInterval(intervalId)
    }, 2500)

    return () => {
      clearInterval(intervalId)
    }

  }, [isOpen])

  useEffect(() => {
    if (!isSpinning) {
      const timerId = setTimeout(() => {
        onData(reels)
        onClose()
      }, 1100)
      
      return () => clearTimeout(timerId); // Clear the timer when the component unmounts or when isSpinning becomes false
    }
  }, [isSpinning])
  

  const handleModalClose = () => {
    // Perform any cleanup or actions before closing the modal
    onClose()
  }

  return (
    <div
      className={`fixed inset-0 overflow-y-auto`}
      aria-labelledby="modal-title"
      role="dialog"
      tabIndex="-1"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-400 bg-opacity-55 transition-opacity"
          aria-hidden="true"
        ></div>

        {/* Modal content */}
        <div
          className="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all w-3/4 lg:w-1/3 md:w-1/2"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Modal header */}
          <div className="flex flex-row-reverse bg-white p-4 items-end">
            <button onClick={handleModalClose} className='w-[15px]'>
              <img src='/cross-mark.png'/>
            </button>
          </div>

          {/* Modal body */}
          <div className="flex flex-row justify-center gap-4 p-8 items-center">
            <div className="flex items-center justify-center border border-gray-300 p-4 rounded-md text-3xl border-2 w-16 h-20">{reels[0]}</div>
            <div className="flex items-center justify-center border border-gray-300 p-4 rounded-md text-3xl border-2 w-16 h-20">{reels[1]}</div>
            <div className="flex items-center justify-center border border-gray-300 p-4 rounded-md text-3xl border-2 w-16 h-20">{reels[2]}</div>
            {/* <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
              placeholder="Type something..."
            /> */}
          </div>
          {/* Modal footer */}
          <div className='flex flex-row items-center bg-white p-4'>
          {/* <button onClick={spinReels}>Spin</button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlotMach