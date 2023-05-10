import React, { useEffect, useContext } from "react";
import { AdminNavbar, AdminTopBar } from "../../components";
import codeContext from "../../context/CodeContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { setLogin, getRole } = useContext(codeContext);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const id = localStorage.getItem("role");
      const role = await getRole(id);
      if (role !== "admin") {
        navigate("/");
      }
    })();
    const d = localStorage.getItem("token");
    if (!d) {
      setLogin(false);
      navigate("/admin");
      return;
    }

    const date = new Date(parseInt(d));
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays > 1) {
      localStorage.removeItem("token");
      setLogin(false);
      navigate("/admin");
      return;
    }
    setLogin(true);
  }, []);
  return (
    <div className={`w-full flex bg-[#222629]`}>
      <div className="w-2/12">
        <AdminNavbar />
      </div>
      <div className="w-10/12">
        <AdminTopBar />
        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
