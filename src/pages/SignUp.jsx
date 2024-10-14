import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import loginIcons from '../assest/signin.gif';
import axios from 'axios';
import { toast } from 'react-toastify';
import uploadImage from '../helpers/uploadImage';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate()
 
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const handleUploadPic = async (e) => {
    const file = e.target.files[0]


    try {
      
     
      const uploadImageCloudinary = await uploadImage(file);
    
      setData((prev) => ({
        ...prev,
        profilePic: uploadImageCloudinary.url
      }));
    } catch (error) { 
      console.error("Error uploading image:", error);
    }
 

  }
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password || !data.confirmPassword || !data.profilePic) {
      toast.error("All fields are required");
      return;
    }


    if (data.name.length <= 3) {
      toast.error("Name must be more than 3 characters");
      return;
    }


    if (data.password <= 5) {
      toast.error("Passwords must be more than 4 characters")

      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const dataResponse = await axios.post(
        `${process.env.REACT_APP_BACK_END}/signup`,
        data,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const { message, success, error } = dataResponse.data;

      if (success) {
        toast.success(message);
      
        navigate("/login")

      } else if (error) {
        toast.error(message);
      
      }
    } catch (error) {
      console.error("Signup failed", error.message);
      toast.error("An unexpected error occurred: " + error.message);
    }

  };

  return (
    <section id="signup">
      <div className="container p-4 mx-auto">

        <div className="bg-light p-5 mx-auto" style={{ maxWidth: '400px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>

          <div className="d-flex justify-content-center mb-4">
            <div className="position-relative overflow-hidden rounded-circle" style={{ width: '80px', height: '80px' }}>
              <img src={data.profilePic || loginIcons} alt="profile" className="w-100 h-100" />
              <form>
                <label className="position-absolute upload-photo-place bottom-0 start-0 w-100 text-center bg-light text-primary py-2" style={{ cursor: 'pointer', fontSize: '12px' }}>

                  {!data.profilePic && "UploadPhoto"}
                  <input type="file" className="d-none" onChange={handleUploadPic} />
                </label>
              </form>


            </div>
          </div>

          <form className="pt-4 d-flex flex-column gap-3" onSubmit={handleSubmit}>
            <div className="mb-1">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                required
                className="form-control bg-light border-0"
              />
            </div>
            <div className="mb-1">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                className="form-control bg-light border-0"
              />
            </div>

            <div className="mb-1">
              <label htmlFor="password">Password:</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  required
                  className="form-control bg-light border-0"
                />
                <div className="input-group-append cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                  <span className="input-group-text bg-light border-0">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-1">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnChange}
                  required
                  className="form-control bg-light border-0"
                />
                <div className="input-group-append cursor-pointer" onClick={() => setShowConfirmPassword(prev => !prev)}>
                  <span className="input-group-text bg-light border-0">
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-danger w-100" style={{ maxWidth: '150px' }}>
              Sign Up
            </button>
          </form>

          <p className="my-4 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-danger">
              Login
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Signup;
