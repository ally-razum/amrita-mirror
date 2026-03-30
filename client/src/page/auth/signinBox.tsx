import { useState } from "react";

export default function SigninBox() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("я слышу кнопку ВОЙТИ", { login, password });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        marginLeft: "10px",
        marginRight: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "450px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "5px 5px 10px #ccc",
        }}
      >
        <form onSubmit={handleLogin}>
          <label style={{ marginBottom: "5px", fontWeight: 500 }}>
            Введите логин
          </label>
          <input
            type="text"
            name="login"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />

          <label style={{ marginBottom: "5px", fontWeight: 500 }}>
            Введите пароль
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />

          <button
            type="submit"
            style={{
              fontSize: "18px",
              padding: "10px",
              width: "100%",
              borderRadius: "20px",
              backgroundColor: "#ba68c8",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
