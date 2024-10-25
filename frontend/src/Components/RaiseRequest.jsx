import React from "react";
import "./RaiseRequest.module.css";

const RaiseRequest = () => {
  return (
    <>
      <div class="input-parent">
        <div class="input-group">
          <label class="label">Hostel Name</label>
          <input
            autocomplete="off"
            name="hostel"
            id="hostel"
            class="input"
            type="text"
          />
          <div></div>
        </div>
        <div class="input-group">
          <label class="label">Email address</label>
          <input
            autocomplete="off"
            name="Email"
            id="Email"
            class="input"
            type="email"
          />
          <div></div>
        </div>
      </div>
      <div className="comment-box-container">
        <textarea
          className="comment-box-textarea"
          placeholder="Your Comment"
          rows={6}
        />
        <div className="comment-box-actions">
          <button className="icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="icon-svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </button>
          <div className="comment-box-buttons">
            <button className="comment-box-button cancel-button">Cancel</button>
            <button className="comment-box-button post-button">
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RaiseRequest;
