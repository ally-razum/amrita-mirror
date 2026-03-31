//todo БЕЗ МЮИ

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";


function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // имитирование входа по логину и паролю (в реальном кейсе был запрос на сервер к бд)
    navigate("/dashboard");
  };

  return (
    <div className="signin">
      <div className="signin__container">
        <label className="signin__label">Введите логин</label>
        <input
          type="text"
          placeholder="Login"
          className="signin__input"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <label className="signin__label">Введите пароль</label>
        <input
          type="password"
          placeholder="Password"
          className="signin__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="signin__button" onClick={handleLogin}>
          Войти
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
