import axios from "axios";
import { useState } from "react";
import { API_URL } from "../util/back/requests";
import { useNavigate } from "react-router-dom";

const AuthLogin = () => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: 0,
      username: login,
      password: password,
    };
    setLoading(true);
    try {
      const response = await axios.post(API_URL + "login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        localStorage.setItem("username", login);
        localStorage.setItem("token", response.data);
        navigate("/loading");
      }
    } catch {
      setError(true);
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
      {" "}
      <div className="rounded-[28px] w-full bg-[#FFFFFF66] p-3">
        <input
          className="w-full text-center"
          placeholder="Acceso"
          required
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div className="rounded-[28px] w-full bg-[#FFFFFF66] p-3">
        <input
          className="w-full text-center"
          placeholder="Contraseña"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className=" bg-[#E7FF2B] rounded-[28px] w-full text-[#37C100] py-2 mt-8 hover:bg-[#E7FF2B]/80"
        type="submit"
      >
        {!loading ? "Conéctese" : "Enviando..."}
      </button>
      {error && (
        <div className="text-red-700 text-center">
          Nombre de usuario o contraseña incorrectos
        </div>
      )}
    </form>
  );
};

export default AuthLogin;
