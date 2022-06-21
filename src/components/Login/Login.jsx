import React, { useState, useEffect } from "react";
import img from "../../images/Group.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import './Login.css'
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [errorList, setErrorList] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/home");
    }
  }, []);
  const getUser = (e) => {
    let currentUser = { ...user };
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser);
  };
  const login = async (e) => {
    e.preventDefault();

    // let valResult=validateLogin(user);
    // console.log(valResult.error.details);
    let  {data}  = await axios.post(
      `https://dashboard.kunozworld.com/api/dashboard/auth/login`,
      user
    );
        let {accessToken}=data.data.Token;
        console.log(accessToken);
    if (data.message === "Successful") {
      localStorage.setItem("userToken", accessToken);
      navigate("/home");
    } else {
      setError(data.message);
      console.log(error);
    }
  };

  const validateLogin = (user) => {
    let schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return schema.validate(user, { abortEarly: false });
  };
  
  return (
    <div className="back">
      <div className="div-center">
        <div className="content">
          <div className="d-flex justify-content-center mb-5">
            <img src={img} alt="" className="" />
          </div>

          {error ? (
            <div className="alert alert-danger">{error.message}</div>
          ) : (
            ""
          )}
          <form onSubmit={login}>
            <div className="form-group py-2 formStyle">
              <div className="input-field">
                {" "}
                <span className="far fa-user p-2"></span>{" "}
                <input
                  type="text"
                  onChange={getUser}
                  placeholder="Email"
                  name="email"
                  required
                  className=""
                />{" "}
              </div>
            </div>
            <div className="form-group py-2 formStyle">
              <div className="input-field">
                {" "}
                <span className="fas fa-lock p-2"></span>{" "}
                <input
                  type="password"
                  onChange={getUser}
                  placeholder="Password"
                  name="password"
                  required
                  className=""
                />{" "}
              </div>
            </div>
          </form>
          <button
            onClick={login}
            className="btn btn-dark w-100  loginBtn mt-2 p-2"
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
