import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Messages from './Messages'
import Bot from './Bot'
import Popular from './Popular'
import Weather from './Weather'
import Slot from './Slot'
import Option from './Option'


function Chat({ id }) {
  const chatContainerRef = useRef(null)
  const [showAllFunction, setShowAllFunction] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [messagesState, setMessagesState] = useState([{content: 'สวัสดี 🙏 🤗', type : 'bot'}, {content: 'ลองกดที่บอทดูสิ  🤖', type : 'bot'}, {content: 'หรือพิมพ์ "คำแนะนำ" เพื่อขอคำแนะนำวิธีใช้', type : 'bot'}])
  const [chatData, setChatData] = useState([])
  const [slotData, setSlotData] = useState([])
  const [popData, setPopData] = useState([])
  const [location, setLocation] = useState(null)
  const [localName, setLocalName] = useState(null)
  const [weather, setWeather] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSelecting, setIsSelecting] = useState()
  const [option, setOption] = useState(['ข้าว','เส้น'])
  const [choice, setChoice] = useState([])
  const url = 'https://a74e-2405-9800-b660-c630-dcf5-d2c2-45dd-778e.ngrok-free.app'


  const handlePostRequest = (text) => {
    const payload = {
      queryText: text,
      sessionId: id,
      languageCode: "th"
    }

    axios.post(`${url}/dialogflow`, payload)
      .then((response) => {
        if (response.data.text) {
          const botResponse = response.data.text
          if (!response.data.isFallback && response.data.isEnd) {
            // handleMessages('ขอเสนอเมนู', 'bot')
            handleMessages(`ขอเสนอเมนู "${botResponse}"`, 'bot')
            handleMessages(`คุณสามารถให้คะแนนเมนูนี้ได้ 🤩`, 'bot')
            handleMessages(botResponse, 'point')
          } else if (response.data.isFallback || !response.data.isEnd) {
            handleMessages(botResponse, 'bot')
          } else {
            handleMessages('ลองอีกครั้ง', 'bot')
          }
      }
      })
      .catch((error) => {
        throw error
      })
  }
  const handleGetRequest = (slot) => {
    const payload = {
        number: slot,
    }

    axios.get(`${url}/slot`, {params : payload} )
    .then((response) => {
      const botResponse = response.data.name
      console.log(response)

      if (typeof botResponse === 'undefined') {
        setTimeout(() => {
          handleMessages('ลองอีกครั้ง', 'bot')
        }, 500)
      } else {
        setTimeout(() => {
          handleMessages(`จากเลขนำโชค นี่คือเมนูอาหารของคุณ "${botResponse}"`, 'bot')
          setTimeout(() => {
            handleMessages('ถูกใจเมนูนี้แค่ไหน ลองให้คะแนนได้', 'bot')
            handleMessages(botResponse, 'point')
          }, 800)
          // console.log(response.data)
        }, 800)
      }

    })
    .catch((error) => {
      throw error
    })
  }
  const handleGetPopRequest = () => {
    console.log('hgh')

    axios.get(`${url}/popfood`)
    .then((response) => {
      const botResponse = response.data.name

      console.log(response)
      if (typeof botResponse === 'undefined') {
        setTimeout(() => {
          handleMessages('ลองอีกครั้ง', 'bot')
        }, 500)
      } else {
        setTimeout(() => {
          handleMessages(`เมนูยอดฮิตช่วงนี้คือ "${botResponse}"`, 'bot')
          handleMessages('ลองให้คะแนนเมนูนี้ได้', 'bot')
          handleMessages(botResponse, 'point')
        }, 500)
      }

    })
    .catch((error) => {
      throw error
    })
  }

  const handleWeatherRequest = (position) => {
    const key = process.env.REACT_APP_WEATHER_API_KEY
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude })
    // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)

    const url_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

      axios.get(url_weather)
      .then((response) => {
        setLocalName(response.data.name)
        setWeather({weatherStatus: response.data.weather[0].main, temp: (response.data.main.temp - 273.15).toFixed(2)})
        // setWeather({weatherStatus: 'Heavly Rain', temp: response.data.main.temp})
        // setWeather({weatherStatus: response.data.weather[0].main, temp: 23.15 + 273.15})
      })
      .catch((error) => {
        throw error
      })
  }

  useEffect(() => {
    if (localName !== null && localName !== undefined) {
      handleMessages(`ขณะนี้ที่ ${localName}`, 'user')
      // console.log(localName)
      setLocalName(null)
    }
  }, [localName])

  useEffect(() => {
    if (weather?.weatherStatus && weather?.temp) {
      // handleMessages(weather.weatherStatus, 'user')
      handleMessages(`อุณหภูมิปัจจุบันคือ ${weather.temp} องศาเซลเซียส`, 'user')
      // console.log(weather)
      const lowerCaseWeatherStatus = weather.weatherStatus.toLowerCase()

      if (lowerCaseWeatherStatus.includes('rain')) {
        handleMessages('ขณะนี้มีฝนตก ลองเมนูนี้มั้ย','bot')
        handlePostRequest('ฝนตก')
      } else if (weather.temp < 25) {
        handleMessages('ช่วงนี้อากาศเย็น ลองเมนูนี้มั้ย','bot')
        handlePostRequest('อากาศหนาว')
      } else if (weather.temp > 33) {
        handleMessages('ช่วงนี้อากาศร้อนมาก ลองเมนูที่มีสรรพคุณแก้ร้อนมั้ย','bot')
        handlePostRequest('อากาศร้อน')
      } else {
        handleMessages('ขณะนี้อากาศกำลังดี ไม่ร้อนมาก ลองเมนูนี้มั้ย','bot')
        handlePostRequest('กินอะไรดี')
      }
      setWeather({})
      setIsLoading(false)
    }
  }, [weather, location])

  const handleGeoError = () => {
    setIsLoading(false)
    handleMessages('ไม่สามารถเข้าถึงตำแหน่งได้ สามารถพิมพ์กับบอทแทนได้', 'bot')
  }

  const handleGetGeographic = () => {
    if (navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(handleWeatherRequest, handleGeoError)
    } else {
      handleMessages('Geolocation not supported', 'bot')
      console.log("Geolocation not supported")
    }
  }

  const handleInputChange = (event) =>{
    setInputValue(event.target.value)
  }

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      handlePostRequest(inputValue)
      handleMessages(inputValue, 'user')
      setInputValue('')
    }
  }

  const handleMessages = (text, type) => {
    setMessagesState((prevMessages) => [
      ...prevMessages,
      { content: text, type: type },
    ])
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSendMessage()
    }
  }
  const toggleAllFunction = () => {
    setShowAllFunction(!showAllFunction)
  }

  const handleChatData = (data) => {
    // console.log('Data received in Chat:', data)
    setChatData(data)
  }
  useEffect(() => {
    chatData.map((message, index) => (
      handleMessages(message.content, message.type)))
  }, [chatData])

  const handleSlotData = (data) => {
    setSlotData(data)
  }
  useEffect(() => {
    if (slotData.length > 0) {
      slotData.map((message, index) => {
        handleMessages(message.content, message.type);
      })
      handleGetRequest(789)
    }
  }, [slotData])

  const handlePopData = (data) => {
    setPopData(data)
  }
  useEffect(() => {
    if (popData.length > 0) {
      popData.map((message, index) => {
        handleMessages(message.content, message.type)
      })
      handleGetPopRequest()
    }
  }, [popData])

  const handleOptionData = (data) => {
    setChoice((prevChoice) => [
      ...prevChoice,
      data,
    ])
  }

  useEffect(() => {
    if ((choice[0] == 'ข้าว' || choice[0] == 'เส้น') && choice.length < 2) {
      setOption(['น้ำ', 'แห้ง'])
      if (choice[0] == 'ข้าว') {
        handleMessages('ข้าว', 'user')
        handlePostRequest('ข้าว')
      } else if (choice[0] == 'เส้น') {
        handleMessages('เส้น','user')
        handlePostRequest('เส้น')
      }
    }

    if (choice[0] == 'ข้าว' && choice.length == 2) {
      if (choice[1] == 'น้ำ') {
        handlePostRequest('น้ำ')
        handleMessages('น้ำ', 'user')
        setOption(['เป็ด','หอย','ไข่','เห็ด','ปู','ปลา','เต้าหู้','กุ้ง','ปลาหมึก','เนื้อ','หมู','ไก่'])
      }
      else if (choice[1] == 'แห้ง') {
        handlePostRequest('แห้ง')
        handleMessages('แห้ง', 'user')
        setOption(['เป็ด','หอย','ไข่','เห็ด','ปู','ปลา','เต้าหู้','กุ้ง','ปลาหมึก','เนื้อ','หมู','ไก่'])
      }
    }
    if (choice[0] == 'เส้น' && choice.length == 2) {
      if (choice[1] == 'น้ำ') {
        handlePostRequest('น้ำ')
        handleMessages('น้ำ', 'user')
        setOption(['เป็ด','ปู','ปลา','กุ้ง','ปลาหมึก','เนื้อ','หมู','ไก่'])
      }
      else if (choice[1] == 'แห้ง') {
        handlePostRequest('แห้ง')
        handleMessages('แห้ง', 'user')
        setOption(['เป็ด','หอย','ปู','ปลา','กุ้ง','ปลาหมึก','เนื้อ','หมู','ไก่'])
      }
    }

    if (choice.length == 3) {
      handlePostRequest(choice[2])
      handleMessages(choice[2], 'user')
      setChoice([])
      setOption(['ข้าว','เส้น'])
      setIsSelecting(false)
    }
  }, [choice])

  const handleOnClickBot = () => {
    if (isSelecting) {
      setIsSelecting(!isSelecting)
      setChoice([])
      setChatData([])
    }else {
      setOption(['ข้าว','เส้น'])
      setIsSelecting(true)
    }
  }

  // Scroll to the bottom of the chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messagesState, isLoading])

  return (
    <>
    <div className="bg-[#F7B787] py-1.5 sm:py-2 px-4 mb-1">
      <h3 className="text-lg font-semibold text-gray-700">Your Food</h3>
    </div>
    <div ref={chatContainerRef} className="flex-1 min-h-0 overflow-y-auto overflow-scroll">
    <Messages messagesArray={messagesState}/>
    {isLoading && 
      <div className="flex flex-row-reverse items-start gap-2.5 mb-2">
        <div className="flex flex-col gap-1 min-w-[85px] max-w-[260px] mr-4">
          <div className="flex leading-1.5 p-2 bg-[#527853] rounded-s-2xl rounded-ee-2xl items-end">
            <p className="mx-2 text-sm font-normal text-white">กำลังค้นหาที่อยู่</p>
            <div className="flex gap-2 mb-1 mr-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-ping"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-ping"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    }
    </div>
    {isSelecting && 
      <div className='flex overflow-scroll py-2 bg-black bg-opacity-30 pr-2'>
        <Option choices={option} clicked={handleOptionData}/> 
      </div>}
    <div className="flex flex-col bg-[#F7B787] p-3 mt-auto py-1.5 sm:py-2">
      <div className='flex items-center'>
        <button id='menuButton' onClick={toggleAllFunction} className='transition ease-in-out duration-150 hover:-translate-1 hover:scale-110 hover:duration-300 mr-2 w-[25px] sm:w-[30px]'>
          <img src='/menu.png' />
        </button>
        <input type="text"
        placeholder="พิมพ์ข้อความของคุณ"
        className="flex-1 p-1 bg-[#F9E8D9] border border-gray-300  rounded-md focus:outline-none hover:border-black"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}></input>
        <button id='sendButton' onClick={handleSendMessage} className="transition ease-in-out duration-150 hover:-translate-1 hover:scale-110 hover:duration-300 ml-2 w-[25px] sm:w-[30px]" >
          <img src='/send.png' />
        </button>
      </div>
      {showAllFunction && 
        <div className='grid grid-cols-2 items-center justify-center gap-1.5 mt-3'>
          <Bot clicked={() => handleOnClickBot()} greeting={handleChatData}/>
          <Popular pop={handlePopData}/>
          <Weather onClick={handleGetGeographic}/>
          <Slot number={handleSlotData}/>
        </div>
      }
    </div>
    </>
  )
}

export default Chat