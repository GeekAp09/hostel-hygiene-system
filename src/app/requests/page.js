import React from 'react';
import styles from './requests.module.css';  // Import CSS module correctly
import cleaner from "/public/cleaner.svg"

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

    const orders = [  { id: 10001, details: 'Kring New Fit office chair, mesh + PU, black', status: 'delivered', date: '16/10/2021', total: '$200.00' },
    { id: 10002, details: 'Kring New Fit office chair, mesh + PU, black', status: 'shipped', date: '16/10/2021', total: '$200.00' },
    { id: 10003, details: 'Kring New Fit office chair, mesh + PU, black', status: 'canceled', date: '16/10/2021', total: '$200.00' }
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
<div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Request</th>
            <th className={styles.th}>Due Date</th>
            <th className={styles.th}>Amount</th>
            </tr>
        </thead>
        <tbody>
    {dummyData.map((t,id)=>{
        return (
            <tr className={styles.tr}>
            <td className={styles.td} data-label="Request"><img src={t.request==="cleaning"?"/cleaner.svg" :"/maintainence.svg"} alt="" className={styles.request_logo} />{t.request.toLocaleUpperCase()}</td>
            <td className={styles.td} data-label="Due Date">{t.date}</td>
            <td className={styles.td} data-label="Status"><div className={styles.ststyle}  style={{ backgroundColor: t.status === "pending" ? "#F04F4F" : "#10A37F" }}>{t.status}</div></td>
            </tr>
        )
    })}

</tbody>
      </table>
    </div>


      </div>
      {/* <div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Account</th>
            <th className={styles.th}>Due Date</th>
            <th className={styles.th}>Amount</th>
            </tr>
        </thead>
        <tbody>
          <tr className={styles.tr}>
            <td className={styles.td} data-label="Account">Visa - 3412</td>
            <td className={styles.td} data-label="Due Date">04/01/2016</td>
            <td className={styles.td} data-label="Amount">$1,190</td>
            </tr>
          <tr className={styles.tr}>
            <td className={styles.td} data-label="Account">Visa - 6076</td>
            <td className={styles.td} data-label="Due Date">03/01/2016</td>
            <td className={styles.td} data-label="Amount">$2,443</td>
            </tr>
          <tr className={styles.tr}>
            <td className={styles.td} data-label="Account">Corporate AMEX</td>
            <td className={styles.td} data-label="Due Date">03/01/2016</td>
            <td className={styles.td} data-label="Amount">$1,181</td>
            </tr>
          <tr className={styles.tr}>
            <td className={styles.td} data-label="Account">Visa - 3412</td>
            <td className={styles.td} data-label="Due Date">02/01/2016</td>
            <td className={styles.td} data-label="Amount">$842</td>
            </tr>
        </tbody>
      </table>
    </div> */}
    </>
  );
};

export default Page;
