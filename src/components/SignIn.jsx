import React, { useState } from "react";
import { customPost } from "../utilities/custom-fetch";
import Header from "./Header.jsx";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from "../utilities/validator";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const navigate = useNavigate();

  function addName(e) {
    setName(e.target.value);
    if (nameValidator(e.target.value)) {
      setNameErr(false);
    } else {
      setNameErr(true);
    }
  }
  function addEmail(e) {
    setEmail(e.target.value);
    if (emailValidator(e.target.value)) {
      setEmailErr(false);
    } else {
      setEmailErr(true);
    }
  }
  function addPassword(e) {
    setPassword(e.target.value);
    if (passwordValidator(e.target.value)) {
      setPasswordErr(false);
    } else {
      setPasswordErr(true);
    }
  }

  function signUp() {
    if (!nameErr && !emailErr && !passwordErr && name && email && password) {
      let obj = {
        name: name,
        email: email,
        password: password,
      };

      customPost(`/user/signup`, obj).then((response) => {
        if (response.result === true) {
          console.log(response.name);
          sessionStorage.setItem("email", response.user.email);
          sessionStorage.setItem("username", response.user.name);
          sessionStorage.setItem("token", response.token);
          navigate("/dashboard");
          alert("Your account created successfully");
        } else {
          alert(response.message);
        }
      });
    } else {
      alert("Fill the form data correctly");
    }
  }

  function signIn() {
    if (email && password) {
      let obj = {
        email: email,
        password: password,
      };
      customPost(`/user/signin`, obj).then((response) => {
        if (response.result === true) {
          // setting info in local-storage to have global access

          sessionStorage.setItem("email", response.user.email);
          sessionStorage.setItem("username", response.user.name);
          sessionStorage.setItem("token", response.token);
          // just to navigate user to post page after successful login
          navigate("/dashboard");
        } else {
          alert("Invalid");
        }
        setName("");
        setEmail("");
        setPassword("");
      });
    } else {
      alert("Fill the Data");
    }
  }
  return (
    <>
      <Header />
      <div className="signin">
        <form onSubmit={signUp}>
          <div className="input">
            <div>Name</div>
            <input type="text" value={name} onChange={(e) => addName(e)} />
            {nameErr ? <div className="error">*Error</div> : null}
          </div>
          <div className="input">
            <div>Email</div>
            <input type="email" value={email} onChange={(e) => addEmail(e)} />
            {emailErr ? <div className="error">*Error</div> : null}
          </div>
          <div className="input">
            <div>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => addPassword(e)}
            />
            {passwordErr ? <div className="error">*Error</div> : null}
          </div>
          <div className="signin-button" onClick={signUp}>
            SignUp
          </div>
          <br />
          <div className="signin-button" onClick={signIn}>
            SignIn
          </div>
          <br />
          <div className="signin-button">SignIn with Google</div>
        </form>
      </div>
    </>
  );
}
