import React from "react";
import { AdminNavbar, AdminTopBar } from "../../components";

const AdminArticles = () => {
    return (
        <div className="w-full">
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

export default AdminArticles;
