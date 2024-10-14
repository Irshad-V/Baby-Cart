import React, { useContext } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import UpsideProductCard from '../components/UpsideProductCard';
import DownsideProductCard from '../components/DownsideProductCard';
import { AppContext } from '../App';


function Home() {

  const dispatch = useDispatch()
  const { fetchUserAddToCart } = useContext(AppContext)
  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const userData = await axios.get(
          `${process.env.REACT_APP_BACK_END}/UserDetails`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        const { success, data } = userData.data
        if (success) {
          dispatch(setUserDetails(data))
        }



      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
    fetchUserAddToCart()
  }, [dispatch])







  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <UpsideProductCard category={"Soap"} heading={"Top's Soap"} />
      <UpsideProductCard category={"Bath Hub"} heading={"Top's Bath Hub"} />
      <UpsideProductCard category={"Beds"} heading={"Top's Beds"} />
      <DownsideProductCard category={"Blanket"} heading={"Top's Blanket"} />
      <DownsideProductCard category={"Carriers"} heading={"Top's Carriers"} />
      <UpsideProductCard category={"Feeding Bottles"} heading={"Top's Feeding Bottles"} />
      <UpsideProductCard category={"Hat"} heading={"Top's Hat"} />
      <UpsideProductCard category={"Jackets"} heading={"Top's Jackets"} />
      <DownsideProductCard category={"Shoes"} heading={"Top'sShoes"} />
      <DownsideProductCard category={"Shorts"} heading={"Top's Shorts"} />
      <UpsideProductCard category={"T-Shirts"} heading={"Top's T-Shirts"} />
      <UpsideProductCard category={"Walkers"} heading={"Top's Walkers"} />

    </div>
  )
}

export default Home