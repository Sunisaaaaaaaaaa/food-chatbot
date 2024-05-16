import React from 'react'

function Message({text}) {
  return (
      <div className="flex items-start gap-2.5">
         <div className="flex flex-col gap-1 min-w-[85px] max-w-[260px] ml-4 my-2">
            <div className="flex flex-col w-full leading-1.5 p-2 bg-[#527853] rounded-e-2xl rounded-es-2xl dark:bg-gray-700 items-center">
               <p className="flex mx-2 text-sm font-normal text-white dark:text-white break-normal">
                  {text}
               </p>
            </div>
            {/* <span className="text-sm font-normal text-gray-800 dark:text-gray-400">11:46</span> */}
         </div>
      </div>
  )
}

export default Message