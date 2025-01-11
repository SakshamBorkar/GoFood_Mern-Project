import React from 'react'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup.jsx'
import { CartProvider } from './components/ContextReducer.jsx'
import MyOrder from './screens/MyOrder.jsx'
// import Cart from './screens/Cart.jsx'

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className=''>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/myOrder" element={<MyOrder />} />
            {/* <Route path="/cart" element={<Cart />} /> */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
