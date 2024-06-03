import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import StoreContextProvider from '../context/storeContext'
import { Outlet } from 'react-router-dom'

const Layout = () => {

  return (
    
    <StoreContextProvider>   
      <div style={{
        width: '80%',
        margin: 'auto'
      }}>
        <Navbar />
            <Outlet />
        <Footer />
    </div>
    </StoreContextProvider>
  )
}

export default Layout
