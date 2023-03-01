import React, { useState, useEffect, useContext } from "react";
import { darkTheme } from "../../assets/Constants";
import { Navbar, AdminNavbar, AdminTopBar } from "../../components";
import { MdAdminPanelSettings } from "react-icons/md";
import codeContext from "../../context/CodeContext";
import swal from "sweetalert";

const Admin = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const {
    login,
    setLogin,
    sqls,
    getSqls,
    questions,
    getQuestions,
    blogs,
    getBlogs,
  } = useContext(codeContext);
  const lableStyle = "text-[#33343B] font-bold text-sm mb-2  ";
  const inputStyle =
    "w-full h-[40px] rounded-md border-[#33343B] border-2 p-2 mb-4 focus:outline-none focus:border-[#33343B] focus:ring-2 focus:ring-[#33343B] focus:ring-opacity-50     ";

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
    <div>
      {login ? (
        <div>
          <div
            className={`w-full min-h-[100vh] flex bg-[${darkTheme.bgPrimary}]`}
          >
            <div className="w-2/12 ">
              {" "}
              <AdminNavbar />{" "}
            </div>
            <div className="w-10/12 flex flex-col">
              {" "}
              <AdminTopBar />{" "}
              <div className=" max-h-[100vh]">
                <div className="grid grid-cols-3 mt-10 w-[90%] mx-auto gap-4">
                  {/* Programming questions */}
                  <div className="bg-white p-4 rounded-lg items-center shadow-md flex justify-between">
                    <h2 className="text-lg font-medium mb-2">
                      Programming Questions
                    </h2>
                    <div className="flex items-center bg-[#E97500] rounded-full h-[100px] text-center justify-center w-[100px]">
                      <span className="text-3xl font-bold mr-2 text-white">500</span>
                    </div>
                  </div>

                  {/* MCQs */}
                  <div className="bg-white p-4 rounded-lg items-center shadow-md flex justify-between">
                    <h2 className="text-lg font-medium mb-2">MCQs</h2>
                    <div className="flex items-center bg-[#E97500] rounded-full h-[100px] text-center justify-center w-[100px]">
                      <span className="text-3xl font-bold mr-2 text-white">200</span>
                    </div>
                  </div>

                  {/* Blogs */}
                  <div className="bg-white p-4 rounded-lg items-center shadow-md flex justify-between">
                    <h2 className="text-lg font-medium mb-2">Blogs</h2>
                    <div className="flex items-center bg-[#E97500] rounded-full h-[100px] text-center justify-center w-[100px]">
                      <span className="text-3xl font-bold mr-2 text-white">100</span>
                    </div>
                  </div>

                  {/* SQL problems */}
                  <div className="bg-white p-4 rounded-lg items-center shadow-md flex justify-between">
                    <h2 className="text-lg font-medium mb-2">SQL Problems</h2>
                    <div className="flex items-center bg-[#E97500] rounded-full h-[100px] text-center justify-center w-[100px]">
                      <span className="text-3xl font-bold mr-2 text-white">50</span>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      ) : (
        <div className={`w-full h-[100vh] flex bg-[${darkTheme.bgPrimary}]`}>
          <Navbar />
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[70%] h-[70%] bg-white rounded-md shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)] flex flex-col items-center">
              <div className="flex items-center gap-4">
                <h1 className="text-center text-[#222629]  font-bold text-2xl mt-10 mb-10  ">
                  {" "}
                  Login{" "}
                </h1>
                <MdAdminPanelSettings className="text-[#33343B] text-4xl" />
              </div>
              <div className="flex flex-col w-[80%] justify-center items-center">
                <div className="flex flex-col">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
