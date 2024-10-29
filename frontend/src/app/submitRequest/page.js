'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './submitRequest.module.css';  // Import CSS module correctly
import axiosInstance from '@/utils/axios';

const CleaningRequest = () => {
  const [user, setUser] = useState(null);
  const [request, setRequest] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Check if user exists in localStorage and redirect to login if not
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRequest(parsedUser.request);  // Set the request type (cleaning/maintain) from localStorage
    } else {
      router.push('/Login');  // Redirect to login if no user is found
    }
  }, [router]);

  // Handle Checkout button click
  const handleCheckout = async () => {
    if (!user) return;

    try {
      const response = await axiosInstance.post('/CleaningRequest', {
        rollnumber: user.rollnumber || user.cleanerid,  // Use rollnumber if student, cleanerid if cleaner
        request: request,  // Use the request type (cleaning/maintain)
      });

      // If successful, show a success popup and redirect to /requests after 2 seconds
      alert('Request successful!');
      setTimeout(() => {
        router.push('/requests');
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // If 400 bad request, show error message and redirect to /requests
        alert('Request already exists!');
        router.push('/requests');
      } else {
        console.error('Error:', error);
      }
    }
  };

  return (
    <>
      <div className={styles["main_page_container"]}>
        <div className={styles["master-container"]}>
          <div className={`${styles["card"]} ${styles["cart"]}`}>
            <label className={styles["title"]}>Your cart</label>
            <div className={styles["products"]}>
              {request === 'cleaning' ? (
                <>
                  <div className={styles["product"]}>
                    <img src="./cleaner.svg" alt="" className={styles["main_image"]} />
                    <div>
                      <span>Cleaning</span>
                      <p>Room Cleaning</p>
                      <p>Bathroom Cleaning</p>
                    </div>
                    <label className={`${styles["price"]} ${styles["small"]}`}>Free</label>
                  </div>
                </>
              ) : request === 'maintain' ? (
                <>
                  <div className={styles["product"]}>
                    <img src="./maintainence.svg" alt="" className={styles["main_image"]} />
                    <div>
                      <span>Maintenance</span>
                      <p>Electricity</p>
                      <p>Troubleshoot</p>
                    </div>
                    <label className={`${styles["price"]} ${styles["small"]}`}>Free</label>
                  </div>
                </>
              ) : (
                <p>No request found.</p>
              )}
            </div>
          </div>

          <div className={`${styles["card"]} ${styles["checkout"]}`}>
            <label className={styles["title"]}>Checkout</label>
            <div className={styles["checkout--footer"]}>
              <label className={styles["price"]}><sup>$</sup>Free</label>
              <button className={styles["checkout-btn"]} onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CleaningRequest;
