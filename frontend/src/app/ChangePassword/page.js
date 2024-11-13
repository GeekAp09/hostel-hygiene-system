"use client";

import React, { useEffect, useState } from "react";
import Style from "./ChangePassword.module.css";
import axiosInstance from "@/utils/axios";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page() {
    const [userId, setUserId] = useState("");
    const [userType, setUserType] = useState('');
    const [oldpass, setOldPassword] = useState("");
    const [newpass, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [response, setResponse] = useState('');
    const router = useRouter();
    

  useEffect(() => {
    let storedUser = localStorage.getItem('user');
    storedUser = JSON.parse(storedUser);
    if (storedUser.cleanerid !== undefined) {
      setUserId(storedUser.cleanerid);
      setUserType("cleanerid");
    } else {
      setUserId(storedUser.rollnumber);
      setUserType("rollnumber");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevents form from refreshing
    try {
      const response = await axiosInstance.post(
        '/changepass',
    
        { [userType]: userId,oldpass,newpass },
      );
      setResponse(response.status);
      if (response.status === 200) {
        toast.success('🦄 Request Successful', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        
        router.push("/requests")

      } else {
        toast.error('🦄 Request Failed', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error('Error fetching cleaner requests:', error);
      toast.error('🦄 Request Failed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className={Style.main_wrapper}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <p>{userType}:{userId}</p>
      <div className={Style.container}>
        <div className={Style.logoContainer}>Change Password</div>
        <form className={Style.form} onSubmit={submitHandler}>
          <div className={Style.formGroup}>
            <label htmlFor="oldpass">Old Password</label>
            <input
              type="password"
              placeholder="Enter your Old Password"
              value={oldpass}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <label htmlFor="newpass">New Password</label>
            <input
              type="password"
              placeholder="Enter your New Password"
              value={newpass}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <div className={Style.confirm_wrapper}>
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              {newpass !== confirmNewPassword && <img src="./error.svg" alt="" width={20} />}
            </div>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <button className={Style.formSubmitBtn} type="submit" 
          disabled={
            newpass !== confirmNewPassword ||
                        newpass.length === 0 ||          
            oldpass.length === 0 ||          
            confirmNewPassword.length === 0   
          }
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
