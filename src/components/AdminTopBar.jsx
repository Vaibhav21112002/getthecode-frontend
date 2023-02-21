import React from "react";
import { useNavigate } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";

const AdminTopBar = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full ">
            <div className="w-full flex">
                <div className="w-full h-[4rem] bg-[#222629] flex justify-start px-8 py-4 items-center text-[#BDA9A9] gap-4 cursor-pointer text-[1.5rem]"></div>
                <div
                    className={`w-full h-[4rem] bg-[#222629] flex justify-end px-8 py-4 items-center text-[#BDA9A9] gap-4 cursor-pointer text-[1.5rem]`}
                >
                    <BsPersonFill />
                    <AiOutlineLogout onClick={() => navigate("/")} />
                </div>
            </div>
            <div className="w-full h-[0.5px] bg-[#222629]"></div>
        </div>
    );
};

export default AdminTopBar;
