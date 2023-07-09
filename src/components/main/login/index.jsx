import { useEffect, useState } from 'react'
import './index.css';
import jwt_decode from 'jwt-decode';
import { useNavigate,Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../state/index.js";
import useForm from "./useForm";
import validate from "./LoginFormValidationRules";
import { Redirect } from "react-router-dom";
import { SmileOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
/* import { useDispatch } from "react-redux"; */
const Login = (props) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );
  const [loggedIn, setLoggedIn] = useState(false);

  function login() {
    setLoggedIn(true);
  }

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

 
  const  openNotification = () => {
    api.open({
      message: 'SORRY!',
      description:
        'UnFortunatly Manual login is not working use Google Authentication.',
      icon: (
        <SmileOutlined
          style={{
            color: '#108ee9',
          }}
        />
      ),
    });
  };

  function handleCallbackResponse(response) {
    console.log("Encided JWT ID token : " + response.credential)
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject)
    if (user) {
      dispatch(
        setLogin({
          user: response.credential,
        }),
      );

      console.log("loged in")
      navigate("/board");

    }


  }

  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id: "945828003086-9o488jkh5e3vnpf4nihsbcq5p36gp7fq.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
  }, []);

  
  return (
    
    <div>
      {contextHolder}
      <div className="main__section">
        <div className="main__left">
          <h1 className="home__title">
            BOARD.
          </h1>
        </div>
        <div className="main__right">
          <div className="wraps">
            <h2>Sign In</h2>
            <span>Sign in to your account</span>
          <div id="signInDiv"></div>
          <div className="section is-fullheight">
            {loggedIn && <Navigate to="/board" />}
            <div className="container">
              <div className="column is-6 is-offset-3">
                <div className="box">
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="field">
                      <label className="label">Email Address</label>
                      <div className="control">
                        <input
                          autoComplete="off"
                          className={`input ${errors.email && "is-danger"}`}
                          type="email"
                          name="email"
                          onChange={handleChange}
                          value={values.email || ""}
                          required
                        />
                        {errors.email && (
                          <p className="help is-danger">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control">
                        <input
                          className={`input ${errors.password && "is-danger"}`}
                          type="password"
                          name="password"
                          onChange={handleChange}
                          value={values.password || ""}
                          required
                        />
                      </div>
                      {errors.password && (
                        <p className="help is-danger">{errors.password}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="button is-block is-info is-fullwidth"
                      onClick={openNotification}
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <br/>
          Don’t have an account?<a href="#" >{" "}Register here</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
