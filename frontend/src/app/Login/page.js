import React from 'react';
import styles from './Login.module.css';  // Correct import for CSS Modules
// import hostel from '/hostel.svg';

const Login = () => {
  return (
    <>
      <div className={styles["main-wrapper"]}>
        <form className={styles.form}>
        <img src="/hostel.svg" alt="Hostel"
        style={{ maxHeight: "90px", marginBottom: "30px" }} />
          <p className={styles.title}>Login</p>
          <p className={styles.message}>Login for availing your services</p>

          <label>
            <input required placeholder="" type="email" className={styles.input} />
            <span>Email</span>
          </label>

          <label>
            <input required placeholder="" type="password" className={styles.input} />
            <span>Password</span>
          </label>
          <button className={styles.submit}>Submit</button>
          <p className={styles.signin}>Forgot Your Password? <a href="#">Reset Password</a></p>
        </form>
      </div>
    </>
  );
};

export default Login;
