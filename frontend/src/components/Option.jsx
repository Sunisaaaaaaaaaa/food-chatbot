import React from 'react'

function Option({choices, clicked }) {

   const handleOnClickOption = (data) => {
      clicked(data)
   }

  return (
   <div className='flex'>
   {choices.map((choice, index) => (
   <div key={index} className="flex items-start gap-2">
      <div className="flex gap-1 min-w-[85px] max-w-[260px] ml-2 drop-shadow-xl">
         <button onClick={() => handleOnClickOption(choice)} className="transition ease-in-out duration-150 hover:-translate-1 hover:scale-110 hover:duration-300 flex flex-col items-center w-full leading-1.5 p-2 bg-[#EE7214] bg-opacity-88 rounded-xl">
            <p className="flex mx-2 text-sm font-bold font-normal text-white dark:text-white break-normal">
               {choice}
            </p>
         </button>
      </div>
   </div>
   ))}
   </div>
  )
}

export default Option