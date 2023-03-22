import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu, AiOutlineHome } from "react-icons/ai";
import { BiArrowBack, BiLogOut } from "react-icons/bi";
import { BiShieldQuarter } from "react-icons/bi";
import Login from "./Login";
import Modal from "react-awesome-modal";
import { BsFillPersonFill } from "react-icons/bs";
import swal from "sweetalert";
import codeContext from "../context/CodeContext";

function Navbar({ question }) {
  const [open, setOpen] = useState(false);
  const usrToken = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(false);
  function logout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    swal({ title: "User logged out successfully", icon: "success", button: "Ok" });
  }
  
  console.log(loggedIn,usrToken);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const { usrData } = useContext(codeContext);

  useEffect(() => {
    if (usrToken !== undefined && usrToken !== null) {
      setLoggedIn(true);
    }
    else if(usrData===null){
      setLoggedIn(false);
      localStorage.removeItem("token");
    }
    if (usrData?.status === true) {
      localStorage.setItem("token", usrData.token);
      setLogin(false);
    }
  }, [usrData]);
  const location = useLocation();
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Programming", path: "/programming" },
    { title: "Blogs", path: "/blogs" },
    { title: "MCQs", path: "/mcqs" },
    { title: "SQL", path: "/sql" },
    { title: "Tech News", path: "/technews" },
  ];
  const loggedOutNavLinks = [
    { title: "Home", path: "/" },
    { title: "Programming", path: "/programming" },
  ];

  const NavLink = ({ link, index }) => {
    return (
      <li key={index}>
        <button
          className="w-full px-4 py-2 text-[white] hover:bg-[#BDA9A9] hover:text-[#202128] rounded-md text-sm"
          onClick={() => navigate(`${link.path}`)}
        >
          {" "}
          {link.title}{" "}
        </button>
        {location.pathname === link.path && (
          <div className="">
            {" "}
            <div className=""></div>{" "}
          </div>
        )}
      </li>
    );
  };
  return (
    <div className="mb-10">
      <div
        style={{ position: "fixed" }}
        className="flex w-full bg-[#222629] z-[10] border-b border-[#33343B]"
      >
        <div className="w-full flex items-center py-4">
          <div className="flex w-full px-4">
            {question && (
              <BiArrowBack
                className="text-[white] text-[1.6rem] mr-3 cursor-pointer"
                onClick={() => navigate("/programming")}
              />
            )}
            <AiOutlineHome
              className="text-[white] text-[1.6rem] cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          <ul className="sm:flex hidden gap-4 w-full justify-end items-center px-8">
            {usrToken !== null
              ? navLinks.map((link, index) => {
                  return <NavLink link={link} index={index} />;
                })
              : loggedOutNavLinks.map((link, index) => {
                  return <NavLink link={link} index={index} />;
                })}
            <BsFillPersonFill
              className=" text-[#BDA9A9] text-2xl hover:text-white cursor-pointer"
              onClick={() => {
                if (usrToken!==null) {
                  swal({
                    title: "Already logged in",
                    icon: "success",
                    button: "Ok",
                  });
                } else {
                  setLogin(true);
                }
              }}
            />
            {loggedIn===true&&<BiLogOut
              className=" text-[#BDA9A9] text-2xl hover:text-white cursor-pointer"
              onClick={logout}
            />}
            <BiShieldQuarter
              className="text-[#BDA9A9] text-2xl hover:text-white cursor-pointer"
              onClick={() => navigate("/admin")}
            />
          </ul>
        </div>
        <div className="w-full flex justify-end items-center px-4 sm:hidden">
          {!open && (
            <AiOutlineMenu
              className="text-[30px] text-white mr-2"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
        {open && (
          <div className="h-[100vh] absolute w-full sm:hidden flex justify-end bg-[rgb(0,0,0,0)] z-[10]">
            <div className="h-full w-8/12 side-nav py-4 px-4">
              <AiOutlineClose
                className="text-[30px] text-white"
                onClick={() => setOpen(!open)}
              />
              <ul className="flex flex-col mt-12 gap-4 justify-center items-center">
                {navLinks.map((link) => {
                  return (
                    <button
                      className="text-black text-lg"
                      onClick={() => navigate(`${link.path}`)}
                    >
                      {" "}
                      {link.title}{" "}
                    </button>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
      <Modal
        visible={login}
        onClickAway={() => setLogin(false)}
        title="Solution"
        width="40%"
        height="70%"
      >
        <Login />
      </Modal>
      <div className="flex w-full justify-center">
        <div className="w-[90%] h-[0.5px] bg-[#33343B]"></div>
      </div>
    </div>
  );
}

export default Navbar;
