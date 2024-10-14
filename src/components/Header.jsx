import React, { useState } from 'react'
import logo from '../assest/baby_cart_logo.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import { GrSearch } from 'react-icons/gr';
import { FaRegUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setUserDetails } from '../store/userSlice';
import { useContext } from 'react';
import { AppContext } from '../App';

function Header() {
  const { fetchUserAddToCart, cartProductCount } = useContext(AppContext)
  const user = useSelector(state => state?.user?.user)
  const [menuDisplay, setMenuDisplay] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)
  const handleLogout = async () => {
    const dataResponse = await axios.get(
      `${process.env.REACT_APP_BACK_END}/userLogout`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const { data } = dataResponse

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      fetchUserAddToCart()
      navigate("/login")
    }
    if (data.error) {
      toast.error(data.message)
    }


  }


  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)

    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("/")
    }
  }

  return (
    <header className=' shadow rounded bg-body fixed w-100 z-40 '>

      <div className='bg-white container-fluid d-flex align-items-center justify-content-between px-5' style={{ height: '64px' }}>
        <div className='d-flex align-items-center'>
          <a href="/">
            <img src={logo} alt="Logo" className='rounded' style={{ width: '50px', height: '40px' }} />
          </a>
          <h6 className='ms-3 text-center pt-2  d-none d-sm-block' >{user ? user.name : ""}</h6>
        </div>

        <div className='d-none d-lg-flex align-items-center  justify-content-between max-w-sm border rounded-pill ps-3'>
          <input
            type='text'
            placeholder='search product here...'
            className='w-100 border-0 outline-none search-input-header'
            onChange={handleSearch} value={search}
          />
          <div className='d-flex align-items-center justify-content-center bg-danger text-white rounded-pill' style={{ minWidth: '50px', height: '32px' }}>
            <GrSearch />
          </div>
        </div>

        <div className='d-flex align-items-center gap-5 user-datas '>

          <div className='relative d-flex justify-content-cente'>

            {
              user?._id && (
                <div
                  className="fs-1 cursor-pointer position-relative d-flex justify-content-center align-items-center d-none d-sm-block"
                  onClick={() => setMenuDisplay(prev => !prev)}
                >
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      className="rounded-circle"
                      alt=''
                      style={{ width: '40px', height: '40px' }}
                    />

                  ) : (
                    <FaRegUserCircle style={{ width: '30px', height: '30px' }} />
                  )}
                </div>
              )
            }

            {
              user?.Role === "ADMIN" && menuDisplay && (
                <div className="position-absolute bg-white p-md-2 shadow-lg rounded" style={{ right: "12.5rem", top: '3.75rem', bottom: '0', height: 'fit-content' }}>
                  <nav>

                    <Link to="/admin-panel" className="text-dark text-decoration-none text-nowrap d-none d-md-block p-2 admin-page-button" onClick={() => setMenuDisplay((prev) => !prev)}>
                      Admin Panel
                    </Link>

                  </nav>
                </div>
              )
            }

          </div>

          {
            user && <div className='fs-2 position-relative pt-1 cart-bucket'>
              <Link to="/Cart">
                <span><FiShoppingCart /></span>
                <div className="bg-danger text-white rounded-circle p-1 d-flex align-items-center justify-content-center position-absolute" style={{ width: '20px', height: '20px', top: '-2px', right: '-12px' }}>
                  <p className="mb-0 text-center cart-bucket-count" style={{ fontSize: '12px' }}>{cartProductCount}</p>
                </div>

              </Link>


            </div>}

          <div>
            {
              user?._id ? <button
                onClick={handleLogout}
                className="btn btn-danger rounded-pill px-3 py-1 text-center login"

              >
                Logout
              </button> :
                <Link to="/login" className="btn btn-danger rounded-pill px-3 py-1 text-center login">
                  Login
                </Link>

            }


          </div>






        </div>


      </div>


    </header>

  )
}

export default Header