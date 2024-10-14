import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import { toast } from 'react-toastify';
import Role from '../helpers/Role';

function ChangeUserRole({ name, email, userId,  RoleDeatail, onClose, callFunc, }) {

    const [userRole, setUserRole] = useState( RoleDeatail);



    const handleOnChangeSelect = (e) => {
       
        setUserRole(e.target.value);
      
    
    };
    
    const updateUserRole = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACK_END}/updateUser`,
                {
                    userId: userId,
                    Role: userRole
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );


            if (response.data.success) {
                toast.success(response.data.message);
                onClose();
                callFunc();
            }


        } catch (error) {
            console.error("Error updating role:", error);
            toast.error("Failed to update role.");
        }
    };


    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
            <div className="bg-white shadow-lg rounded-3 p-4 position-relative" style={{ maxWidth: '400px', width: '90%' }}>


                <IoMdClose className="btn-close " onClick={onClose} />

                <h2 className="h5 fw-bold text-center mb-4">Change User Role</h2>


                <div className="mb-3">
                    <p className="mb-1"><strong>Name:</strong> {name}</p>
                    <p className="mb-1"><strong>Email:</strong> {email}</p>
                </div>


                <div className="d-flex align-items-center justify-content-between my-4">
                    <p className="mb-0">Role:</p>
                    <select
                        className="form-select"
                        value={userRole}
                        onChange={handleOnChangeSelect}
                    >
                        {Object.values(Role).map(el => (
                            <option value={el} key={el}>
                                {el}
                            </option>
                        ))}
                    </select>
                </div>


                <button
                    className="btn btn-danger w-100"
                    onClick={updateUserRole}
                >
                    Change Role
                </button>
            </div>
        </div>
    );
}

export default ChangeUserRole;
