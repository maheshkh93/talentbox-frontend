import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import { customGet } from "../utilities/custom-fetch";

export default function Dashboard() {
  const [course, setCourse] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username) {
      setUsername(username);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    customGet(`/course/get-course`).then((response) => {
      console.log(response.course);
      response.course ? setCourse(response.course) : null;
    });
  }, []);

  const signOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Header navAction={signOut} action="SignOut" />
      <div>
        <h3>Welcome to freeCodeCamp.org</h3>
        <div>
          "I have not failed, I've just found 10,000 ways that won't work"
          <div>-Thomas A. Edision</div>
        </div>
        {course
          ? course.map((item) => (
              <div key={item._id} className="course-container">
                {item.title} ({item.duration})
              </div>
            ))
          : null}
      </div>
    </>
  );
}
