import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Point({name, id}) {
  const [score, setScore] = useState(0)
  const [addPoint, setAddPoint] = useState([false])
  const [scoreId, setScoreId] = useState(0)

  const handleUpdatePoint = (foodName, foodPoint) => {
    const url = 'https://a74e-2405-9800-b660-c630-dcf5-d2c2-45dd-778e.ngrok-free.app'
    const payload = {
      name: foodName,
      point: foodPoint
    }

    axios.post(`${url}/updatepoint`, payload)
      .then((response) => {
        if (response.data.name) {
          const botResponse = response.data
          // console.log(botResponse)
          // handleMessages(botResponse, 'bot')
        } else {
          handleMessages('can not', 'bot')
        }
      })
      .catch((error) => {
        throw error
      })
  }

  const handleStarClick = (starValue, index) => {
    // Update the score based on the selected star value
    if (addPoint[index]) {
      // console.log(`food : ${name} socre : ${starValue}`)
      handleUpdatePoint(name, starValue)
      // value(starValue)
      // console.log(`Star ${starValue} clicked!`)
    }
  }

  const handleOnClick = (starValue, index) => {
    if (!addPoint[index]) {
      // console.log('Clicked message index:', starValue)
      // console.log('index:', index)

      setScore(starValue)
      setScoreId(index)
      setAddPoint((prevAddPoint) => ({
        ...prevAddPoint,
        [index]: true, // Set isAdd to true for the clicked message
      }))
    }else {
      console.log('update point already!')
    }
      
  }
  useEffect(() => {
    if (addPoint[scoreId]) {
      handleStarClick(score, scoreId);
    }
  }, [addPoint])


  return (
    <>
       <div className="flex items-start gap-2.5">
        <div className="flex flex-col gap-1 min-w-[85px] max-w-[260px] ml-4 my-2">
          <div className="flex flex-col w-full leading-1.5 p-2 bg-[#527853] rounded-e-2xl rounded-es-2xl dark:bg-gray-700">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <svg
                    key={starValue}
                    className={`w-4 h-4 ${starValue <= score ? 'text-yellow-300' : 'text-gray-300'} ms-1 cursor-pointer`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                    onClick={() => handleOnClick(starValue, id)}
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
          </div>
          {/* <span className="text-sm font-normal text-gray-800 dark:text-gray-400">11:46</span> */}
        </div>
    </div>
    </>
  )
}

export default Point