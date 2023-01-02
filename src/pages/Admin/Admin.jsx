import React from "react";
import { darkTheme } from "../../assets/Constants";
import { AdminNavbar, AdminTopBar } from "../../components";

const Admin = () => {
    return (
        <div className={`w-full bg-[${darkTheme.bgPrimary}]`}>
            <AdminTopBar />
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
