import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu, AiOutlineHome } from "react-icons/ai";
import { BiShieldQuarter } from "react-icons/bi";

function Navbar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const navLinks = [
        { title: "Home", path: "/" },
        { title: "Programming", path: "/programming" },
        { title: "Blogs", path: "/blogs" },
        { title: "Articles", path: "/articles" },
    ];

    return (
        <div>
            <div style={{position:'fixed'}} className="flex w-full bg-[#202128] z-[10]">
                <div className="w-full flex items-center py-4">
                    <div className="flex w-full px-4">
                        <AiOutlineHome
                            className="text-[#BDA9A9] text-[1.6rem] cursor-pointer"
                            onClick={() => navigate("/")}
                        />
                    </div>
                    <ul className="sm:flex hidden gap-4 w-full justify-end items-center px-8">
                        {navLinks.map((link, index) => {
                            return (
                                <li key={index}>
                                    <button
                                        className="px-4 py-2 text-[#BDA9A9] hover:bg-[#BDA9A9] hover:text-[#202128] rounded-md text-sm"
                                        onClick={() => navigate(`${link.path}`)}
                                    >
                                        {link.title}
                                    </button>
                                    {location.pathname === link.path && (
                                        <div className="">
                                            <div className=""></div>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                        <BiShieldQuarter
                            className="text-[#BDA9A9] text-2xl hover:text-white cursor-pointer"
                            onClick={() => navigate("/admin")}
                        />
                    </ul>
                </div>
                <div className="w-full flex justify-end items-center px-4 sm:hidden flex">
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
                                            onClick={() =>
                                                navigate(`${link.path}`)
                                            }
                                        >
                                            {link.title}
                                        </button>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex w-full justify-center">
                <div className="w-[90%] h-[0.5px] bg-[#33343B]"></div>
            </div>
        </div>
    );
}

export default Navbar;
