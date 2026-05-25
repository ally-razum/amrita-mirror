import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";


function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="signin">
      <form onSubmit={handleLogin} className="signin__container">
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

        <button className="signin__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
