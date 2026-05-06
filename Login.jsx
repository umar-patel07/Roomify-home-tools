import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6NaQpAd8xsb2ms1BaGIO5Ya1rzd5CZJw",
  authDomain: "roomify-ar-home-planner-61ccd.firebaseapp.com",
  projectId: "roomify-ar-home-planner-61ccd",
  storageBucket: "roomify-ar-home-planner-61ccd.firebasestorage.app",
  messagingSenderId: "371033100663",
  appId: "1:371033100663:web:377a6c053095ce630b1172",
  measurementId: "G-99CKL8YGC1"
};

const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseapp);
const usersRef = collection(db, "users");

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [popup, setPopup] = useState({ show: false, message: "" });
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Custom popup function
  const showPopup = (message, redirect = false) => {
    setPopup({ show: true, message });
    setTimeout(() => {
      setPopup({ show: false, message: "" });
      if (redirect) navigate("/home"); // redirect to home page
    }, 2000); // popup visible for 2 seconds
  };

  const verify = (email, password) => {
    let userExists = false;
    getDocs(usersRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (email === doc.data().email) {
            userExists = true;
            if (password === doc.data().password) {
              console.log(doc.id);
              showPopup("Login Successful!", true); // ✅ popup + redirect
            } else {
              showPopup("Incorrect Password!");
            }
          }
        });

        if (!userExists) {
          showPopup("No such user exists!");
        }
      })
      .catch((error) => {
        console.error("Error getting documents:", error);
        showPopup("Error logging in!");
      });
  };

const createUser = (name, email, password) => {
  let userExists = false;
  getDocs(usersRef)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (email === doc.data().email) {
          userExists = true;
        }
      });
      if (!userExists) {
        addDoc(usersRef, { email, name, password })
          .then(() => {
            showPopup("Signed up successfully! Redirecting to login...", false);
            setTimeout(() => setIsLogin(true), 2000); 
          })
          .catch((error) => {
            console.error("Error adding user:", error);
            showPopup("Signup failed!");
          });
      } else {
        showPopup("User already exists!");
      }
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      showPopup("Signup failed!");
    });
};


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin && form.password !== form.confirmPassword) {
      showPopup("Passwords do not match!");
      return;
    }

    if (isLogin) {
      verify(form.email, form.password);
    } else {
      createUser(form.name, form.email, form.password);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-box ${isLogin ? "login-mode" : "signup-mode"}`}>
        <h2>
          Room<span className="brand-accent">ify</span>
        </h2>
        <p>
          {isLogin
            ? "Welcome back! Please login to continue."
            : "Create your account and start your journey with us."}
        </p>

        <div className="form-wrapper">
          <form onSubmit={handleSubmit} key={isLogin ? "login" : "signup"}>
            {!isLogin && (
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  required
                />
              </div>
            )}

            <button type="submit" className="auth-btn">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>

        <p className="auth-footer">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Sign up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </>
          )}
        </p>
      </div>

      {/* ✅ Simple Popup */}
      {popup.show && (
        <div className="popup">
          <div className="popup-content">{popup.message}</div>
        </div>
      )}
    </div>
  );
}
