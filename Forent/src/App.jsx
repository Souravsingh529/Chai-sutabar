import React, { useState } from 'react'
import Navbar from './component/Navbar/Navbar'
import{Route,Routes} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Placeorder from './Pages/Placeorder/Placeorder'
import Footer from './component/Footer/Footer'
import LoginPopup from './component/LoginPopup/LoginPopup'

const App = () => {
  const [showLogin,setShowLogin]=useState(false);

  return (
    <>
    { showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/Order' element={<Placeorder/>} />
      </Routes>
      </div>
    <Footer/>
    </>
  )
}

export default App