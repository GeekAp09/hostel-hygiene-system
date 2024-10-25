import React from 'react'
import './cleaner.module.css'
import cleaner from "../../public/cleaner.svg"

const CleaningRequest = () => {
  return (
    <>
    <div className="master-container">
  <div className="card cart">
    <label className="title">Raise Request</label>
    <div className="products">
      <div className="product">

<img src={cleaner} alt="" className='cleaner-image'/>
        <div>
          <span>Romm Cleaning</span>
          
        </div>
        <div className="quantity">
          <button>
            <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M20 12L4 12"></path>
            </svg>
          </button>
          <label>X1</label>
          <button>
            <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M12 4V20M20 12H4"></path>
            </svg>
          </button>
        </div>
        <label className="price small">Free</label>
      </div>
    </div>
  </div>

  {/* <div className="card coupons">
    <label className="title">Apply coupons</label>
    <form className="form">
        <input type="text" placeholder="Apply your coupons here" className="input_field"/>
        <button>Apply</button>
    </form>
  </div> */}

  <div className="card checkout">
    <label className="title">Checkout</label>
    {/* <div className="details">
      <span>Your cart subtotal:</span>
      <span>47.99$</span>
      <span>Discount through applied coupons:</span>
      <span>3.99$</span>
      <span>Shipping fees:</span>
      <span>4.99$</span>
    </div> */}
    <div className="checkout--footer">
      <label className="price"><sup>₹</sup>Free</label>
      <button className="checkout-btn">Submit Request</button>
    </div>
  </div>
</div>
    </>
  )
}

export default CleaningRequest