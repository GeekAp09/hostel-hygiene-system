import React from 'react';
import styles from './submitRequest.module.css';  // Import CSS module correctly

const CleaningRequest = () => {
  return (
    <>
    <div className={styles["main_page_container"]}>
      
      <div className={styles["master-container"]}>
        <div className={`${styles["card"]} ${styles["cart"]}`}>
          <label className={styles["title"]}>Your cart</label>
          <div className={styles["products"]}>
            <div className={styles["product"]}>
              <img src="./cleaner.svg" alt="" className={styles["main_image"]} />
              <div>
                <span>Cleaning</span>
                <p>Room Cleaning</p>
                <p>BathRoom Cleaning</p>
              </div>
              <div className={styles["quantity"]}>
                <button>
                  <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" stroke="#47484b" d="M20 12L4 12"></path>
                  </svg>
                </button>
                <label>1</label>
                <button>
                  <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" stroke="#47484b" d="M12 4V20M20 12H4"></path>
                  </svg>
                </button>
              </div>
              <label className={`${styles["price"]} ${styles["small"]}`}>Free</label>
            </div>
          </div>
        </div>

       
        <div className={`${styles["card"]} ${styles["checkout"]}`}>
          <label className={styles["title"]}>Checkout</label>
          <div className={styles["checkout--footer"]}>
            <label className={styles["price"]}><sup>$</sup>Free</label>
            <button className={styles["checkout-btn"]}>Checkout</button>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default CleaningRequest;
