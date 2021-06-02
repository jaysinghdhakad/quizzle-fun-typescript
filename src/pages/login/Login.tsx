import { useState } from "react";
import { useQuiz } from "../../context/quiz-provider/QuizContextProvider";
import "./Login.css";
import { submitNameHandler, takeUserName } from "./Login.utils";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth-provider/authContextProvider";
import { Data } from "../signup/signupType";

export const Login = () => {
  // const [userInput, setUserInput] = useState("");
  // const { dispatch } = useQuiz();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    setToken,
    setLogin,
    isUserLogin,
    setUserName,
    loginFailedModel,
    setLoginFailedModel,
  } = useAuth();

  const LogInHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/login",
        // `https://cook-es-watch.herokuapp.com/login`,

        {
          email,
          password,
        }
      );

      setEmail("");
      setPassword("");
      console.log(res.data);
      loginUser(res.data);
    } catch (error) {
      setLoginFailedModel(true);
      setEmail("");
      setPassword("");
    }
    function loginUser(data: Data) {
      setLogin(true);

      setToken(data.token);
      navigate("/quizzes");
      setUserName(data.userName);

      localStorage?.setItem(
        "login",
        JSON.stringify({
          isUserLoggedIn: true,
          token: data.token,
          name: data.userName,
        })
      );
    }
  };

  function Logout() {
    localStorage?.removeItem("login");
    setLogin(false);
    setToken(null);
  }
  console.log(loginFailedModel);

  return (
    <div className="login">
      <div className="login-box">
        <h2>Log In</h2>
        <form>
          <div className="user-box">
            <input
              type="email"
              name=""
              // onChange={(e) => takeUserName(e, setUserInput)}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name=""
              // onChange={(e) => takeUserName(e, setUserInput)}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>password</label>
          </div>
          <p className="switch-page-description">
            create an account{" "}
            <Link to="/signup" className="switch-page-link">
              Sign Up
            </Link>
          </p>
          {isUserLogin ? (
            <button
              className="submit-button"
              disabled={false}
              id="submit-button"
              // onClick={() => submitNameHandler(dispatch, userInput, navigate)}
              onClick={(e) => Logout()}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Log Out
            </button>
          ) : (
            <button
              className="submit-button"
              disabled={false}
              id="submit-button"
              // onClick={() => submitNameHandler(dispatch, userInput, navigate)}
              onClick={(e) => LogInHandler(e)}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Log In
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
