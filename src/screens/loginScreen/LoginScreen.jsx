import React, { useEffect } from "react";
import "./loginScreen.scss";
import logo from "../../components/header/log.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/auth.action";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleLogin = () => {
    dispatch(login());
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return (
    <div className="login">
      <div className="login__container">
        <img src={logo} alt="" />
        <button onClick={handleLogin}>Connectez-vous avec google</button>
        <p>Découvrer une nouvelle expérience de Youtube avec rcTube</p>
      </div>
    </div>
  );
};

export default LoginScreen;
