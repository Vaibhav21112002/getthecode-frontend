import React from "react";
import { darkTheme } from "../../assets/Constants";
import { AdminNavbar } from "../../components";

const AdminArticles = () => {
    return (
        <div className="w-full">
            <div
                className={`w-full h-[4rem] bg-[${darkTheme.bgPrimary}]`}
            ></div>
            <div className="w-full">
                <div className="w-2/12">
                    <AdminNavbar />
                </div>
            </div>
        </div>
    );
};

export default AdminArticles;
