import React,{useState,useEffect,useContext} from "react";
import { darkTheme } from "../assets/Constants";
import codeContext from "../context/CodeContext";
import {
  BsFillPersonFill,
  BsCodeSlash,
  BsInfoLg,
  BsQuestionCircle,
} from "react-icons/bs";
import { MdDashboard, MdHomeFilled } from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { AiOutlineConsoleSql } from "react-icons/ai";

const AdminNav = () => {
  const [name, setName] = useState("");
  const { usrData, getRole,getUser,getAdmin } = useContext(codeContext);
  const usrToken = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      const adminToken = localStorage.getItem("admin-token");
      const admin = await getAdmin(adminToken);
      setName(admin.name)
      // const user = await getUser(id);
      // console.log(role);
      // setName(user.name);
    })();
  }, []);

  const navigate = useNavigate();
  const navLinks = [
    { title: "Home", path: "/", icon: <MdHomeFilled /> },
    { title: "Dashboard", path: "/admin/q1w2e3r4t528032023", icon: <MdDashboard /> },
    { title: "Programming", path: "/admin/programming", icon: <BsCodeSlash /> },
    { title: "Blogs", path: "/admin/blogs", icon: <BsInfoLg /> },
    { title: "MCQs", path: "/admin/mcqs", icon: <BsQuestionCircle /> },
    { title: "SQL", path: "/admin/sql", icon: <AiOutlineConsoleSql /> },
    {
      title: "Tech News",
      path: "/admin/technews",
      icon: <HiOutlineNewspaper />,
    },
  ];
  return (
    <div
      className={`sm:flex hidden flex-col py-4 items-center w-full h-[100vh] bg-[${darkTheme.bgPrimary}] `}
    >
      <div
        className={`w-[90%] h-[2rem] bg-[#222629] rounded-lg flex justify-center items-center text-[#BDA9A9] gap-2 cursor-pointer`}
        onClick={() => navigate("/admin/profile")}
      >
        <BsFillPersonFill className=" text-[1.2rem]" />
        <h1>{`Welcome ${name.charAt(0).toUpperCase() + name.slice(1)}`}</h1>
      </div>
      <div className="w-[90%] h-[0.5px] bg-bg-[#33343B] my-4"></div>
      <div className="w-[90%]">
        <ul className="w-full flex flex-col gap-4 px-2 justify-center">
          {navLinks.map((link, index) => {
            return (
              <div key={index}>
                <button
                  className="flex items-center gap-2 text-[16px] text-[#BDA9A9] hover:text-black hover:bg-white py-2 px-6 rounded-xl text-sm"
                  onClick={() => navigate(`${link.path}`)}
                >
                  {" "}
                  {link.icon} {link.title}{" "}
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdminNav;
