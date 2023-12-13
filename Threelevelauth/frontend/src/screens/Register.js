import React, { useState } from "react";
import styles from "./register.module.css";
import img1 from "../assets/04086f4b8b394ba7bdaa1.png";
import img2 from "../assets/542638 1.png";
import img3 from "../assets/159478 1.png";
import axios from "axios";


function Register() {
    const [uname, setUname] = useState("");
    const [pass, setPass] = useState("");

  const handleLogin = async () => {
    console.log('hi')
    try {
      // Make a POST request to your server endpoint with username and password
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        username: uname,
        password: pass,
      });

      // Handle the response as needed (e.g., show a success message)
      console.log("Login successful:", response.data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className={styles.regbg}>
      <img src={img1} alt="Background" />

      <div>
        <h2 className={styles.biglogin}>Login</h2>
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
            value={uname}
            onChange={(e) => setUname(e.target.value)}
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
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
      </div>
      <button className={styles.lgnbtn} onClick={handleLogin}>
        LOGIN
      </button>
      <div>
        <p className={styles.forgotlink}>Forgot Password</p>
        <p className={styles.forgotlink2}>
          Don't have an account? <span className={styles.forgotlink}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
