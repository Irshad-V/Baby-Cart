import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const AppContext = createContext();
function App() {

  const [cartProductCount, setCartProductCount] = useState(0);
  const fetchUserAddToCart = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACK_END}/countCartProduct`, {
        withCredentials: true
      });


      setCartProductCount(response?.data?.data?.count || 0);
    } catch (error) {
      console.error('Error fetching cart product count:', error);
    }
  };

  useEffect(() => { 

    fetchUserAddToCart();
  }, []);

  return (
    <>
      <AppContext.Provider value={{
    
        cartProductCount, 
        fetchUserAddToCart 
      }}>
        <ToastContainer
          position='top-center'
        />
        <Header   />
        <main className='custom-min-height'>
          <Outlet />
        </main>
        <Footer />
      </AppContext.Provider>
    </>


  )
}

export default App