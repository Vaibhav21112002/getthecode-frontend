import React from "react";
import { darkTheme } from "../../assets/Constants";
import { AdminNavbar, AdminTopBar } from "../../components";

const Admin = () => {
    return (
        <div className={`w-full flex bg-[${darkTheme.bgPrimary}]`}>
            <div className="w-2/12 ">
                <AdminNavbar />
            </div>
            <div className="w-10/12">
                <AdminTopBar />
                <div className="w-[0.5px] max-h-[100vh] bg-[#33343B]"></div>
            </div>
        </div>
    );
};

export default Admin;
