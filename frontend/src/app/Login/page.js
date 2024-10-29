'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axios';
import styles from './Login.module.css';

const Login = () => {
  const [user, setUser] = useState('Student');
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);  // Add loading state
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      router.push('/requests');
    }
  }, [router]);

  const toggleUserType = () => {
    setUser(user === 'Student' ? 'Cleaner' : 'Student');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loader

    if (user === 'Student') {
      try {
        const response = await axiosInstance.post('/hostlerlogin', {
          rollnumber: rollNumber,
          password: password,
        });

        localStorage.setItem('user', JSON.stringify(response.data));
        setLoading(false);  // Stop loader
        router.push('/requests');
      } catch (error) {
        setLoading(false);  // Stop loader
        if (error.response && error.response.status === 400) {
          setErrorMessage('Login failed. Please check your credentials.');
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
      }
    } else {
      try {
        const response = await axiosInstance.post('/cleanerlogin', {
          cleanerid: rollNumber,
          password: password,
        });

        localStorage.setItem('user', JSON.stringify(response.data));
        setLoading(false);  // Stop loader
        router.push('/requests');
      } catch (error) {
        setLoading(false);  // Stop loader
        if (error.response && error.response.status === 400) {
          setErrorMessage('Login failed. Please check your credentials.');
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
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

          <button className={styles.submit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          {loading && <div className={styles.loader}></div>} {/* Loader element */}

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
