import React, { useState, useEffect, useContext } from "react";
import { darkTheme } from "../../assets/Constants";
import { Navbar, AdminNavbar, AdminTopBar, Footer } from "../../components";
import { MdAdminPanelSettings } from "react-icons/md";

import codeContext from "../../context/CodeContext";
import swal from "sweetalert";

const Admin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const topics = ["questions", "mcqs", "sqls", "blogs", "more"];

  const {
    login,
    setLogin,
    sqls,
    getSqls,
    questions,
    getQuestions,
    blogs,
    getBlogs,
    mcqs,
    getMcqs,
  } = useContext(codeContext);
  const lableStyle = "text-[#33343B] font-bold mx-auto text-sm mb-2  ";
  const inputStyle =
    "w-[70%] mx-auto h-[40px] rounded-md border-[#33343B] border-2 p-2 mb-4 focus:outline-none focus:border-[#33343B] focus:ring-2 focus:ring-[#33343B] focus:ring-opacity-50";

  useEffect(() => {
    getSqls();
    getQuestions();
    getBlogs();
    getMcqs();
  }, []);
  console.log(sqls);
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

  const Card = ({ topic }) => {
    const topicHeadingDict = {
      questions: "Problem Solving",
      mcqs: "MCQ",
      sqls: "SQL Queries",
      blogs: "Technical Blogs",
      more: "More to be added soon...",
    };
    const lengths = {
      questions: questions.length,
      mcqs: mcqs.length,
      sqls: sqls.length,
      blogs: blogs.length
    };
    return (
      <div
        className={`${
          topic !== "more" ? "bg-[#E97500]" : "bg-white"
        } h-[184px] mb-10 rounded-lg  relative w-[95%]`}
      >
        <div
          className={`absolute p-4 rounded-lg flex-wrap items-center shadow-md  justify-between top-[10px] left-[10px] flex ${
            topic !== "more"
              ? "bg-[white] text-black"
              : "bg-[#E97500] text-white"
          }  rounded-t-lg h-full w-full`}
        >
          <div
            className={`flex flex-wrap ${
              topic !== "more" ? "w-[70%]" : "text-center"
            }`}
          >
            <h1
              className={`text-[48px] ${
                topic !== "more" ? "w-[70%]" : ""
              } font-normal mb-2 font-serif`}
              style={{ fontFamily: "IBM Plex Serif" }}
            >
              {topicHeadingDict[topic]}
            </h1>
          </div>
          {topic !== "more" && (
            <div className="flex items-center bg-[#E97500] rounded-full h-[80px] text-center justify-center w-[80px]">
              <span className="text-4xl font-bold mr-2 text-white">
                {lengths[topic]}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <div>
      {login ? (
        <div className="flex flex-col">
          <div className={`w-full flex bg-[${darkTheme.bgPrimary}]`}>
            <div className="w-2/12 ">
              {" "}
              <AdminNavbar admin={true} />{" "}
            </div>
            <div className="w-10/12 flex flex-col flex-grow">
              {" "}
              <AdminTopBar />{" "}
              {sqls?.length >= 0 && (
                <div className="">
                  <div className="grid grid-cols-3 mt-10 w-[90%] mx-auto gap-4">
                    {topics.map((topic) => (
                      <Card topic={topic} />
                    ))}
                  </div>
                </div>
              )}{" "}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`w-full flex min-h-[100vh] bg-[${darkTheme.bgPrimary}]`}
        >
          <Navbar />
          <div className="w-full h-full flex justify-center items-center my-auto">
            <div className="w-[70%] h-[70%] bg-white rounded-md shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)] flex flex-col items-center">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
