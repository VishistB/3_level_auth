import React from 'react'
import styles from "./register.module.css";
import img1 from "../assets/04086f4b8b394ba7bdaa1.png";
import img2 from "../assets/542638 1.png";
import img3 from "../assets/159478 1.png";
import axios from "axios";

function Otp() {
    return (
        <div className={styles.regbg}>
      <img src={img1} alt="Background" />

      <div>
        <h2 className={styles.biglogin}>ENTER OTP
        </h2>
        <p className={styles.paralogin}>Please Sign in to continue</p>
      </div>
      <div>
        <div className={styles.inpdiv}>
          <div className={styles.leftinp1}>
            <img src={img2} alt="Username icon" />
          </div>
          <input
            type="text"
            placeholder="USERNAME"
            className={styles.rightinp1}
          />
        </div>
        <div className={styles.inpdiv}>
          <div className={styles.leftinp2}>
            <img src={img3} alt="Password icon" />
          </div>
          <input
            type="password"
            placeholder="PASSWORD"
            className={styles.rightinp2}
          />
        </div>
      </div>
      <button className={styles.lgnbtn2}>
        Send OTP
      </button>
      <div>
        <p className={styles.forgotlink}>Forgot Password</p>
        <p className={styles.forgotlink2}>
          Don't have an account? <span className={styles.forgotlink}>Sign up</span>
        </p>
      </div>
    </div>
    )
}

export default Otp
