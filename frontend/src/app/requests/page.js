import React from 'react';
import styles from './requests.module.css';  // Import CSS module correctly

const Page = () => {

    const dummyData = [
        { id: 1, date: '2024-01-12', status: 'complete', request: 'cleaning' },
        { id: 2, date: '2024-02-15', status: 'pending', request: 'maintenance' },
        { id: 3, date: '2024-03-02', status: 'complete', request: 'cleaning' },
        { id: 4, date: '2024-04-18', status: 'pending', request: 'maintenance' },
        { id: 5, date: '2024-05-10', status: 'complete', request: 'cleaning' },
        { id: 6, date: '2024-06-22', status: 'pending', request: 'cleaning' },
        { id: 7, date: '2024-07-05', status: 'complete', request: 'maintenance' },
        { id: 8, date: '2024-08-14', status: 'pending', request: 'cleaning' },
        { id: 9, date: '2024-09-28', status: 'complete', request: 'maintenance' },
        { id: 10, date: '2024-10-07', status: 'pending', request: 'maintenance' },
        { id: 11, date: '2024-11-11', status: 'complete', request: 'cleaning' },
        { id: 12, date: '2024-12-19', status: 'pending', request: 'maintenance' },
        { id: 13, date: '2024-01-03', status: 'complete', request: 'cleaning' },
        { id: 14, date: '2024-02-20', status: 'pending', request: 'cleaning' },
        { id: 15, date: '2024-03-17', status: 'complete', request: 'maintenance' },
      ];
      
  return (
    <>

    <div className={styles["parent-container"]}>

      <div className={styles["main-wrapper"]}>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <input className={styles.input} type="radio" name="card" value="basic"/>
            <span className={styles.check}></span>
            <label className={styles.label}>
              <div className={styles.my_title}>Cleaning</div>
              <div className={styles.price}>
                Room Cleaning / BathRoom Cleaning
              </div>
            </label>
          </div>

          <div className={styles.card}>
            <input className={styles.input} type="radio" name="card" value="standart"/>
            <span className={styles.check}></span>
            <label className={styles.label}>
              <div className={styles.my_title}>Maintain</div>
              <div className={styles.price}>
                Repair Electronics/Troubleshoot
              </div>
            </label>
          </div>
        </div>

        <div className={styles["raise-request-container"]}>
          <div className={styles.lower_card}>
            <form className={styles.form}>
              <button className={styles.btn}>Submit</button>
            </form>
          </div>
        </div>
      </div>

<h2>Your Previous Requests:</h2>
<div className={styles["order_headings"]}>
    <div>Title</div>
    <div>Order Date</div>
    <div>Status</div>
</div>
<div className={styles["request_order"]}>
    {dummyData.map((t,id)=>{
        return (
            <div className={styles["order_container"]}>
            <div className={styles.order_title}>{t.request}</div>
            <div className={styles.order_date}>{t.date}</div>
            <div className={styles.order_status}>{t.status}</div>
            </div>
        )
    })}
</div>
      </div>
    </>
  );
};

export default Page;
