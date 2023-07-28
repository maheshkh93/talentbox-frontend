import React from "react";
import Header from "./Header.jsx";
import { useNavigate } from "react-router-dom";
export default function Landing() {
  const navigate = useNavigate();
  const navSignIn = () => {
    navigate("/login/signup");
  };
  return (
    <>
      <Header navAction={navSignIn} action="SignIn" />
      <div className="landing-main">
        <h1>Learn to Code-for free.</h1>
        <h1>Build projects.</h1>
        <h1>Earn certifications.</h1>
        <h3>
          Since 2014, more than 40,000 freeCodeCamp.org graduates have gotten
          jobs at tech companies including
        </h3>
        <div className="companies">
          <span>Apple</span>
          <span>Google</span>
          <span>Microsoft</span>
          <span>Spootify</span>
          <span>Amozon</span>
        </div>
        <div className="button"> Get started ( it's free ) </div>
      </div>
    </>
  );
}
