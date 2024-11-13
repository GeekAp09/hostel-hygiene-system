'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axios';
import styles from './requests.module.css'; // Import CSS module correctly

const Page = () => {
  const [service, setService] = useState('');
  const [userType, setUserType] = useState(''); // Track if user is Student or Cleaner
  const [name, setName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [rollnumber, setRollNumber] = useState('');
  const [hostel, setHostel] = useState('');
  const [previousRequests, setPreviousRequests] = useState([]); // To store fetched data
  const [sessionData, setSessionData] = useState({});
  const [toastMessage, setToastMessage] = useState(''); // Toast message state
  const router = useRouter();

  // Fetch the user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.rollnumber) {
        // If rollnumber exists, it's a student
        setRollNumber(parsedUser.rollnumber);
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
    } else{
      router.push("/Login")
    }
  }, []);

  // Fetch previous requests for the student using rollnumber
  const fetchPreviousRequests = async (rollnumber) => {
    try {
      const response = await axiosInstance.post(
        '/FetchAllHostlerReq', // Using a POST request
        { rollnumber }, // Pass roll number in the request body
      );
      setPreviousRequests(response.data); // Store fetched requests in state
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
    } catch (error) {
      console.error('Error fetching cleaner requests:', error);
    }
  };


  const handleChangePassword=()=>{
    router.push('/ChangePassword');
  }
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    router.push('/Login'); // Redirect to login page
  };

  // Handle service selection and store it in localStorage
  const handleServiceSelect = (selectedService) => {
    setService(selectedService);
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    storedUser.request = selectedService; // Add selected service to user data
    localStorage.setItem('user', JSON.stringify(storedUser)); // Update user data in localStorage
  };

  // Handle form submit and redirect to /submitRequest
  const handleSubmit = (e) => {
    e.preventDefault();
    if (service) {
      router.push('/submitRequest'); // Redirect to /submitRequest after selecting service
    } else {
      alert('Please select a service before submitting.');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Toast handler to show popup and clear message after a few seconds
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000); // Clear message after 3 seconds
  };

  // Handle request completion
  const completeHandler = async (request) => {
    try {
      const response = await axiosInstance.post('/Completed', {
        request,
        rollnumber,
      });
      
      if (response.status === 200) {
        // Re-fetch previous requests to re-render the table
        fetchPreviousRequests(rollnumber);
        showToast('Request marked as completed successfully!');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showToast('Request already exists or there was an error processing it.');
      } else {
        showToast('An unexpected error occurred.');
      }
    }
  };

  return (
    <>
      {/* Toast Popup */}
      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}

      <div className={styles['parent-container']}>
        <div className={styles.navbar}>
          {/* Dynamically display the user's name and either room number or hostel */}
          {name} | {userType === 'Student' ? `Room No. ${roomNumber}` : `Hostel ${hostel}`}
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
          <button className={styles.logoutButton} onClick={handleChangePassword}>
            Change Password
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
                  value="cleaning"
                  onClick={() => handleServiceSelect('cleaning')}
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
                  value="maintain"
                  onClick={() => handleServiceSelect('maintain')}
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
                <form className={styles.form} onSubmit={handleSubmit}>
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
                {userType === 'Cleaner'? 
                <th className={styles.th}>Room No.</th>
                :""}

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
                    {userType === 'Cleaner'? 
                    <td className={styles.td} data-label="Room No.">
                      {request.room}
                    </td> : ""}
                    <td className={styles.td} data-label="Due Date">
                      {formatDate(request.createdAt)}
                    </td>
                    <td className={styles.td} data-label="Status">
                    {userType === 'Student' && request.status === "Pending" ?
                    
                    <div className={styles.pending_parent}>
                    <div
                        className={styles.ststyle}
                        style={{ backgroundColor: request.status === 'Pending' ? '#F04F4F' : '#10A37F' }}>
                        {request.status}
                        </div>
                        <button className={styles.btntick} onClick={()=>completeHandler(request.request)}><img src="./tick.svg" alt="" className={styles.finalTick} /></button>
                    </div>
                      :<div
                        className={styles.ststyle}
                        style={{ backgroundColor: request.status === 'Pending' ? '#F04F4F' : '#10A37F' }}>
                        {request.status}
                        </div>
}
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
