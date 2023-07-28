import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import { customGet } from "../utilities/custom-fetch";

export default function Dashboard() {
  const [course, setCourse] = useState([
    {
      title: "Responsive Web Design Certification",
      duration: "300 hours",
    },
  ]);
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
    let email = sessionStorage.getItem("email");
    customGet(`/course/get-course/${email}`).then((response) => {
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
              <div className="course-container">
                {item.title} ({item.duration})
              </div>
            ))
          : null}
      </div>
    </>
  );
}
