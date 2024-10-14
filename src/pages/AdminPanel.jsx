
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Role from '../helpers/Role';
import './AdminPanel.css'; 

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.Role !== Role.ADMIN) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="d-flex flex-column flex-md-row vh-100 custom-min-height-admin">
       
        <aside className="bg-white h-auto h-md-100 w-100 w-md-auto d-flex flex-column" style={{ maxWidth: '240px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'  }}>
            
          
            <div className="d-flex justify-content-center align-items-center flex-column m-md-4 gap-md-2 " >
                <div className="text-center cursor-pointer position-relative mt-1" >
                    {user?.profilePic ? (
                        <img src={user.profilePic} alt="User" className="rounded-circle" style={{ width: '30px', height: '30px' }} />
                    ) : (
                        <FaRegCircleUser className="fs-6" />
                    )}
                </div>
                <p className="text-capitalize  fw-semibold mb-0 font" style={{fontSize: '12px' }}>{user?.name}</p>
                <p className="mt-2 " style={{ fontSize: '8px' }}>{user?.Role}</p>
            </div>
    
            <nav className="d-grid text-center d-flex flex-row flex-md-column justify-content-center p-1" style={{ padding: '2px' }}>
                <Link to="all-users" className=" hover-bg-link" style={{ fontSize: '12px' }}>All Users</Link>
                <Link to="all-products" className="px-1  hover-bg-link" style={{ fontSize: '12px' }}>All Products</Link>
            </nav>
    
        </aside>
     
     
        <main className="w-100 p-2 flex-grow-1">
            <Outlet />
        </main>
    </div>
    
    );
};

export default AdminPanel;
