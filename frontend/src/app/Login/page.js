'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router
import axiosInstance from '@/utils/axios';
import styles from './Login.module.css';

const Login = () => {
  const [user, setUser] = useState('Student');
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter(); // Next.js router for navigation

  // Check if user is already logged in and redirect
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      router.push('/requests'); // Redirect to /requests if user is already logged in
    }
  }, [router]);

  // Function to toggle between Student and Cleaner login
  const toggleUserType = () => {
    setUser(user === 'Student' ? 'Cleaner' : 'Student');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (user === 'Student') {
      try {
        // Use axios instance with custom baseURL for student login
        const response = await axiosInstance.post('/hostlerlogin', {
          rollnumber: rollNumber,
          password: password,
        });

        // On successful login - store data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data));

        // Redirect to the requests page
        router.push('/requests');
      } catch (error) {
        console.error('Login error:', error);
        setErrorMessage('Login failed. Please check your roll number and password.');
      }
    } else {
      try {
        // Use axios instance with custom baseURL for cleaner login
        const response = await axiosInstance.post('/cleanerlogin', {
          cleanerid: rollNumber, // Using cleanerid instead of roll number
          password: password,
        });

        // On successful login - store cleaner data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data));

        // Redirect to the requests page
        router.push('/requests');
      } catch (error) {
        console.error('Cleaner login error:', error);
        setErrorMessage('Login failed. Please check your cleaner ID and password.');
      }
    }
  };

  return (
    <>
      <div className={styles["main-wrapper"]}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <img src="/hostel.svg" alt="Hostel" style={{ maxHeight: "90px", marginBottom: "30px" }} />
          <p className={styles.title}>Login as {user}</p>
          <p className={styles.message}>Login for availing your services</p>

          <label>
            <input
              required
              placeholder=""
              type="number"
              className={styles.input}
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)} 
            />
            <span>{user === 'Student' ? 'Roll no.' : 'Cleaner ID'}</span>
          </label>

          <label>
            <input
              required
              placeholder=""
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            <span>Password</span>
          </label>

          <button className={styles.submit}>Submit</button>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <p className={styles.signin}>
            Forgot Your Password? <a href="#">Reset Password</a>
          </p>
        </form>
        <button
          className={styles.login_changer}
          onClick={toggleUserType}
        >
          {user === 'Student' ? 'Cleaner Login' : 'Student Login'}
        </button>
      </div>
    </>
  );
};

export default Login;
