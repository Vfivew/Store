import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Login } from "../components/Auth/Login";
import { useAppSelector } from "../hooks/redux-hooks";

const LoginPage: React.FC = () => {
  const isAuth = useAppSelector((state) => state.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    } else navigate("/login");
  }, [isAuth, navigate]);

  return (
    <main className="auth-page">
      <div className="auth-page-block">
        <Login />
        <div className="auth-page-reference">
          <Link className="gradient-button" to="/register">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
