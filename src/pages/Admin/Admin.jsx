import React from "react";
import { darkTheme } from "../../assets/Constants";
import { AdminNavbar } from "../../components";

const Admin = () => {
    return (
        <div className={`w-full bg-[${darkTheme.bgPrimary}]`}>
            <div
                className={`w-full h-[4rem] bg-[${darkTheme.bgPrimary}]`}
            ></div>
            <div className="w-full h-[0.5px] bg-[#33343B]"></div>
            <div className="w-full ">
                <div className="w-2/12">
                    <AdminNavbar />
                </div>
                <div className="w-[0.5px] h-[100vh] bg-[#33343B]"></div>
            </div>
        </div>
    );
};

export default Admin;
