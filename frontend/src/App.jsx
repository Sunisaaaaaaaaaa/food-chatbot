import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Chat from './components/Chat'
import './index.css'



//backgroud and chat
function App() {
  const id = crypto.randomUUID()

  return (

    <div style={{ backgroundImage: "url(/background.jpg)", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100vw", height: "100vh"}}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col bg-[#F9E8D9] bg-opacity-75 border-2 border-black shadow-lg overflow-hidden w-11/12 min-w-[270px] max-w-[400px] md:w-1/2 lg:w-2/3 xl:w-1/2 h-[85vh] md:h-[65vh] lg:h-[90vh] mx-auto">
        <Chat id={id}/>
        </div>
      </div>
    </div>
    
  )
}

export default App
