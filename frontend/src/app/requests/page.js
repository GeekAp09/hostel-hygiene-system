'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './requests.module.css'; // Import CSS module correctly
import axiosInstance from '@/utils/axios';

const Page = () => {
  const [service, setService] = useState('');
  const [userType, setUserType] = useState(''); // Track if user is Student or Cleaner
  const [name, setName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [hostel, setHostel] = useState('');
  const [previousRequests, setPreviousRequests] = useState([]); // To store fetched data
  const [sessionData, setSessionData] = useState({});
  const router = useRouter();

  // Fetch the user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.rollnumber) {
        // If rollnumber exists, it's a student
        setUserType('Student');
        setName(parsedUser.name);
        setRoomNumber(parsedUser.roomnumber);
        // Fetch previous requests using rollnumber
        fetchPreviousRequests(parsedUser.rollnumber);
      } else if (parsedUser.cleanerid) {
        // If cleanerid exists, it's a cleaner
        setUserType('Cleaner');
        setName(parsedUser.name);
        setHostel(parsedUser.hostel);
        // Fetch requests specific to cleaners
        fetchCleanerRequests(parsedUser.cleanerid);
      }
    }

    // Fetching everything from sessionStorage
    const sessionDataObj = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const value = sessionStorage.getItem(key);
      sessionDataObj[key] = value; // Store session data in an object
    }
    setSessionData(sessionDataObj); // Store session data in state
  }, []);

  // Fetch previous requests for the student using rollnumber
  const fetchPreviousRequests = async (rollnumber) => {
    try {
      const response = await axiosInstance.post(
        '/FetchAllHostlerReq', // Using a POST request
        { rollnumber }, // Pass roll number in the request body
      );
      setPreviousRequests(response.data); // Store fetched requests in state
      console.log('Previous Requests:', response.data); // Print response to the console
    } catch (error) {
      console.error('Error fetching previous requests:', error);
    }
  };

  // Fetch cleaning requests for the cleaner using cleanerid
  const fetchCleanerRequests = async (cleanerid) => {
    try {
      const response = await axiosInstance.post(
        '/NeededToClean', // Using the correct endpoint for cleaners
        { cleanerid }, // Pass cleanerid in the request body
      );
      setPreviousRequests(response.data); // Store fetched requests in state
      console.log('Cleaner Requests:', response.data); // Print response to the console
    } catch (error) {
      console.error('Error fetching cleaner requests:', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    router.push('/Login'); // Redirect to login page
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className={styles['parent-container']}>
        <div className={styles.navbar}>
          {/* Dynamically display the user's name and either room number or hostel */}
          {name} | {userType === 'Student' ? `Room No. ${roomNumber}` : `Hostel ${hostel}`}
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Conditionally render the main-wrapper only for students */}
        {userType === 'Student' && (
          <div className={styles['main-wrapper']}>
            <div className={styles.wrapper}>
              <div className={styles.card}>
                <input
                  className={styles.input}
                  type="radio"
                  name="card"
                  value="basic"
                  onClick={() => {
                    setService('cleaning');
                  }}
                />
                <span className={styles.check}></span>
                <label className={styles.label}>
                  <div className={styles.my_title}>Cleaning</div>
                  <div className={styles.price}>Room Cleaning / BathRoom Cleaning</div>
                </label>
              </div>

              <div className={styles.card}>
                <input
                  className={styles.input}
                  type="radio"
                  name="card"
                  value="standart"
                  onChange={() => {
                    setService('maintain');
                  }}
                />
                <span className={styles.check}></span>
                <label className={styles.label}>
                  <div className={styles.my_title}>Maintain</div>
                  <div className={styles.price}>Repair Electronics/Troubleshoot</div>
                </label>
              </div>
            </div>

            <div className={styles['raise-request-container']}>
              <div className={styles.lower_card}>
                <form className={styles.form}>
                  <button className={styles.btn}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        )}

        <h2>Your {userType === 'Student' ? 'Previous' : 'Cleaning'} Requests:</h2>
        <div>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th}>Request</th>
                <th className={styles.th}>Due Date</th>
                <th className={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {previousRequests.length > 0 &&
                previousRequests.map((request, id) => (
                  <tr className={styles.tr} key={id}>
                    <td className={styles.td} data-label="Request">
                      <img
                        src={request.request === 'cleaning' ? '/cleaner.svg' : '/maintainence.svg'}
                        alt=""
                        className={styles.request_logo}
                      />
                      {request.request.toUpperCase()}
                    </td>
                    <td className={styles.td} data-label="Due Date">
                      {formatDate(request.createdAt)}
                    </td>
                    <td className={styles.td} data-label="Status">
                      <div
                        className={styles.ststyle}
                        style={{ backgroundColor: request.status === 'Pending' ? '#F04F4F' : '#10A37F' }}
                      >
                        {request.status}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Page;
