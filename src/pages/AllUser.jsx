import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import axios from 'axios';
import ChangeUserRole from '../components/ChangeUserRole';
import { MdModeEditOutline } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
const AllUsers = () => { 
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        Role: "",
        _id: "" 
    });

    const fetchAllUsers = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACK_END}/Allusers`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );


            if (response.data.success) {
                setAllUsers(response.data.data);

            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('An error occurred while fetching users.');
        }
    };
   
    useEffect(() => {
        fetchAllUsers();
    }, []);
   

    return (
        <div className="bg-white pb-4" style={{ height: 'calc(100vh - 190px)', overflowY: 'scroll' }}>
            <table className="table table-bordered w-100"  >
                <thead className="table-dark">
                    <tr>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Image</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-wrap'>
                    {allUser.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item?.name}</td>
                            <td>{item?.email}</td>
                            <td><div
                  className="fs-1 cursor-pointer position-relative d-flex justify-content-center align-items-center "
                 
                >
                  {item?.profilePic ? (
                    <img
                      src={item?.profilePic}
                      className="rounded-circle"
                      alt=''
                      style={{ width: '40px', height: '40px' }}
                    />

                  ) : (
                    <FaRegUserCircle style={{ width: '30px', height: '30px' }} />
                  )}
                </div></td>
                            <td>{item?.Role}</td>
                            <td>{moment(item?.createdAt).format('LL')}</td>
                            <td>

                                <div className='ml-auto  bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center cursor-pointer'
                                    onClick={() => {
                                        setUpdateUserDetails(item);
                                        setOpenUpdateRole(true);
                                    }} style={{ width: '2rem', height: '2rem' }}>
                                    <MdModeEditOutline />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

         
            {openUpdateRole && (
                

                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    RoleDeatail={updateUserDetails.Role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}
        </div>
    );
};

export default AllUsers;
