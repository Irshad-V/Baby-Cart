import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import loginIcons from '../assest/signin.gif';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate()
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataResponse = await axios.post(
                `${process.env.REACT_APP_BACK_END}/signin`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
       
            const { success, message, error } = dataResponse.data;

            if (success) {
                toast.success(message);
                navigate('/');
               
            } else if (error) {
                toast.error(message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error("Login failed:", error.message);
        }
    };


    return (
        <section id='login'>
            <div className="container py-4 ">
                <div className="bg-light p-5 mx-auto" style={{ maxWidth: '400px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <div className="text-center mb-4">
                        <img src={loginIcons} alt="login icons" className="w-25 h-25" />
                    </div>

                    <form className="pt-4 d-flex flex-column gap-3" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                name="email"
                                value={data.email}
                                onChange={handleOnChange}
                                className="form-control border-primary"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Enter your password"
                                    value={data.password}
                                    name="password"
                                    onChange={handleOnChange}
                                    className="form-control border-primary"
                                />
                                <div
                                    className="input-group-append cursor-pointer"
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    <span className="input-group-text bg-light border-0">
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                            <Link
                                to="/forgot-password"
                                className="d-block text-end text-primary mt-3"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block mt-4"
                            style={{ maxWidth: '150px' }}
                        >
                            Login
                        </button>
                    </form>

                    <p className="my-4 text-center">
                        Don't have an account?{' '}
                        <Link to="/sign-up" className="text-primary">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Login;
