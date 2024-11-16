import { useState } from 'react'
import Home from './pages/Home.jsx'
import Footer from './pages/Footer.jsx'
import Navbar from './pages/Navbar.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='homeBg h-auto w-100%'> 
    <Navbar />
    <Home />
    <Footer />
    </div>
  )
}

export default App
