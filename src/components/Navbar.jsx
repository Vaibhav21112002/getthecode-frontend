import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu, AiOutlineHome } from "react-icons/ai";
import { BiArrowBack, BiLogOut,BiShieldQuarter } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import swal from "sweetalert";
import codeContext from "../context/CodeContext";

function Navbar({ question }) {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  function logout() {
    swal({
      title: "Are you sure you want to log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.clear();
        setLoggedIn(false);
        navigate("/")
      }
    });
  }
  
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const { usrData, getRole } = useContext(codeContext);
  const usrToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("admin-token");

  useEffect(() => {
    // // console.log(usrData);
    // if ((usrToken !== undefined && usrToken !== null)||(adminToken !== undefined && adminToken !== null)) {
    //   setLoggedIn(true);
    // } else if (usrData === null) {
    //   setLoggedIn(false);
    //   localStorage.removeItem("token");
    // }
    // if (usrData?.status === true) {
    //   localStorage.setItem("token", usrData.token);
    //   // localStorage.setItem("role", usrData?.user._id);
    //   setLogin(false);
    //   setLoggedIn(true);
    // }
    if(!usrToken && !adminToken){
      setLoggedIn(false);
      setLogin(false);
    }else{
      setLoggedIn(true);
      setLogin(true);
    }
  }, [usrData]);
  const location = useLocation();
  const navLinks = [
    { title: "Home", path: "/", loginReq: false },
    { title: "Programming", path: "/programming/all", loginReq: false },
    { title: "Blogs", path: "/blogs", loginReq: true },
    { title: "MCQs", path: "/mcqs", loginReq: true },
    { title: "SQL", path: "/sql", loginReq: true },
    { title: "Tech News", path: "/technews", loginReq: true },
  ];

  async function handleAdminClick() {
    const id = localStorage.getItem("role");
    const role = await getRole(id);
    if (role?.error) {
      // console.log(role.error);
      if(loggedIn)
        swal({ title: role.error.message+"Please log back in", icon: "error", button: "Ok" });
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setLoggedIn(false);
      navigate("/");
    }
    if (loggedIn === false) {
      setLogin(true);
    } else if (role?.toLowerCase() !== "admin") {
      swal({
        title: "You are not an admin",
        icon: "error",
        button: "Ok",
      });
    } else navigate("/admin");
  }



  const NavLink = ({ link, index }) => {
    
    return (
      <li key={index}>
        <button
          className="w-full px-4 py-2 text-[white] hover:bg-[#BDA9A9] hover:text-[#202128] rounded-md text-sm"
          onClick={() => {
            console.log(link.path)
            console.log(loggedIn);
            if (link.loginReq === true && loggedIn === false) {
             swal({title:`Please login first to access ${link.title}`,icon:'warning',buttons:'Ok'})
            } else navigate(`${link.path}`);
          }}
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
    <div className="mb-10 z-50">
      <div
        style={{ position: "fixed" }}
        className="flex w-full bg-[#222629] z-[10] border-b border-[#33343B]"
      >
        <div className="w-full flex items-center py-4">
          <div className="flex w-full px-4">
            {question && (
              <BiArrowBack
                className="text-[white] text-[1.6rem] mr-3 cursor-pointer"
                onClick={() => navigate(-1)}
              />
            )}
            <AiOutlineHome
              className="text-[white] text-[1.6rem] cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          <ul className="sm:flex hidden gap-4 w-full justify-end items-center px-8">
            {navLinks.map((link, index) => {
              return <NavLink link={link} index={index} />;
            })}
            {loggedIn !== true ? (
              <BsFillPersonFill
                className=" text-[#BDA9A9] text-2xl hover:text-white cursor-pointer"
                onClick={() => {
                  if (usrToken !== null) {
                    swal({
                      title: "Already logged in",
                      icon: "success",
                      button: "Ok",
                    });
                  } else {
                    navigate("/login");
                  }
                }}
              />
            ) : 
             <BiLogOut
              className=" text-[#BDA9A9] text-2xl hover:text-white cursor-pointer"
              onClick={logout}
             />}
            <BiShieldQuarter
              className="text-[#BDA9A9] text-2xl hover:text-white cursor-pointer"
              onClick={() => {
                navigate('/admin/q1w2e3r4t528032023',{replace:true});
              }}
            />
          </ul>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="w-[90%] h-[0.5px] bg-[#33343B]"></div>
      </div>
    </div>
  );
}

export default Navbar;
