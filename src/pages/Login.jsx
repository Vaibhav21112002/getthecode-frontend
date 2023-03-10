import React, { useState, useEffect, useContext } from "react";
import { Navbar, Footer } from "../components";
import "../assets/CSS/index.css";
import { darkTheme } from "../assets/Constants";
import codeContext from "../context/CodeContext";
import { topics } from "../assets/Constants";
import swal from "sweetalert";
import { MdAdminPanelSettings } from "react-icons/md";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);

  const { login, setLogin } = useContext(codeContext);
  const lableStyle = "text-[#33343B] font-bold mx-auto text-sm mb-2  ";
  const inputStyle =
    "w-[70%] mx-auto h-[40px] rounded-md border-[#33343B] border-2 p-2 mb-4 focus:outline-none focus:border-[#33343B] focus:ring-2 focus:ring-[#33343B] focus:ring-opacity-50";

  useEffect(() => {
    const d = localStorage.getItem("token");
    if (!d) {
      setLogin(false);
      return;
    }

    const date = new Date(parseInt(d));
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays > 1) {
      localStorage.removeItem("token");
      setLogin(false);
      return;
    }
    setLogin(true);
  }, []);

  const handleLogin = () => {
    if (form.username === "admin" && form.password === "admin") {
      localStorage.setItem("token", new Date().getTime());
      swal({ title: "Login Successfull", icon: "success", button: "Ok" });
      setForm({ username: "", password: "" });
      setLogin(true);
      return;
    }
    swal({ title: "Login Failed", icon: "error", button: "Ok" });
  };

  return (
    <div className=" h-full pt-[50px]">
      {isLogin ? (
        <div cclassName="w-full flex h-full bg-[white] items-center justify-center">
          <div className="w-full h-full flex justify-center items-center my-auto">
            <div className="w-[70%] h-[70%] bg-white rounded-md flex flex-col items-center">
              <div className="flex items-center gap-4">
                <h1 className="text-center text-[#222629]  font-bold text-2xl mt-10 mb-10  ">
                  {" "}
                  Login{" "}
                </h1>
                <MdAdminPanelSettings className="text-[#33343B] text-4xl" />
              </div>
              <div className="flex flex-col w-full justify-center items-center">
                <div className="flex flex-col w-full">
                  <label className={lableStyle}> Username </label>
                  <input
                    className={inputStyle}
                    type="text"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                  />
                  <label className={lableStyle}> Password </label>
                  <input
                    className={inputStyle}
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>
                <button
                  className="w-[40%] h-[40px] bg-[#33343B] text-white rounded-md mt-4 mb-4 hover:bg-[#222629] transition duration-300 ease-in-out	 focus:outline-none "
                  onClick={handleLogin}
                >
                  {" "}
                  Login{" "}
                </button>
                <button
                  className="w-[40%] h-[40px] bg-[#33343B] text-white rounded-md mt-4 mb-4 hover:bg-[#222629] transition duration-300 ease-in-out	 focus:outline-none "
                  onClick={() => {
                    setIsLogin((prevState) => !prevState);
                  }}
                >
                  Not a user? Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div cclassName={`w-full flex h-full bg-[white]`}>
          <div className="w-full h-full flex justify-center items-center my-auto">
            <div className="w-[70%] h-[70%] bg-white rounded-md  flex flex-col items-center">
              <div className="flex items-center gap-4">
                <h1 className="text-center text-[#222629]  font-bold text-2xl mt-10 mb-10  ">
                  {" "}
                  Login{" "}
                </h1>
                <MdAdminPanelSettings className="text-[#33343B] text-4xl" />
              </div>
              <div className="flex flex-col w-full justify-center items-center">
                <div className="flex flex-col w-full">
                  <label className={lableStyle}> Username </label>
                  <input
                    className={inputStyle}
                    type="text"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                  />
                  <label className={lableStyle}> Password </label>
                  <input
                    className={inputStyle}
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>
                <button
                  className="w-[40%] h-[40px] bg-[#33343B] text-white rounded-md mt-4 mb-4 hover:bg-[#222629] transition duration-300 ease-in-out	 focus:outline-none "
                  onClick={handleLogin}
                >
                  {" "}
                  Sign Up{" "}
                </button>
                <button
                  className="w-[40%] h-[40px] bg-[#33343B] text-white rounded-md mt-4 mb-4 hover:bg-[#222629] transition duration-300 ease-in-out	 focus:outline-none "
                  onClick={() => {
                    setIsLogin((prevState) => !prevState);
                  }}
                >
                  Already a user? Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
