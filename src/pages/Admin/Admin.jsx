import React, { useState, useEffect, useContext } from "react";
import { darkTheme } from "../../assets/Constants";
import { AdminNavbar, AdminTopBar } from "../../components";
import { MdAdminPanelSettings } from "react-icons/md";
import codeContext from "../../context/CodeContext";
import swal from "sweetalert";

const Admin = () => {
	const [form, setForm] = useState({ username: "", password: "", });

	const { login, setLogin } = useContext(codeContext);
	const lableStyle = "text-[#33343B] font-bold text-sm mb-2  ";
	const inputStyle = "w-full h-[40px] rounded-md border-[#33343B] border-2 p-2 mb-4 focus:outline-none focus:border-[#33343B] focus:ring-2 focus:ring-[#33343B] focus:ring-opacity-50     ";

	useEffect(() => {
		const d = localStorage.getItem("token");
		if (!d) {
			setLogin(false);
			return;
		}

		const date = new Date(parseInt(d));
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
		if (diffDays > 1) {
			localStorage.removeItem("token");
			setLogin(false);
			return;
		}
		setLogin(true);
	}, []);

	const handleLogin = () => {
		if (form.username === "admin" && form.password === "admin") {
			localStorage.setItem("token", new Date().getTime());
			swal({ title: "Login Successfull", icon: "success", button: "Ok", });
			setForm({ username: "", password: "", });
			setLogin(true);
			return;
		}
		swal({ title: "Login Failed", icon: "error", button: "Ok", });
	};
	return (
		<div>
			{login ? (
				<div className={`w-full min-h-[100vh] flex bg-[${darkTheme.bgPrimary}]`} >
					<div className="w-2/12 "> {" "} <AdminNavbar />{" "} </div>
					<div className="w-10/12"> {" "} <AdminTopBar />{" "} <div className="w-[0.5px] max-h-[100vh] bg-[#33343B]"></div>{" "} </div>
				</div>
			) : (
				<div className={`w-full h-[100vh] flex bg-[${darkTheme.bgPrimary}]`} >
					<div className="w-full h-full flex justify-center items-center">
						<div className="w-[70%] h-[70%] bg-white rounded-md shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)] flex flex-col items-center">
							<div className="flex items-center gap-4">
								<h1 className="text-center text-[#222629]  font-bold text-2xl mt-10 mb-10  "> {" "} Login{" "} </h1>
								<MdAdminPanelSettings className="text-[#33343B] text-4xl" />
							</div>
							<div className="flex flex-col w-[80%] justify-center items-center">
								<div className="flex flex-col">
									<label className={lableStyle}> {" "} Username{" "} </label>
									<input className={inputStyle} type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value, }) } />
									<label className={lableStyle}> {" "} Password{" "} </label>
									<input className={inputStyle} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value, }) } />
								</div>
								<button className="w-[40%] h-[40px] bg-[#33343B] text-white rounded-md mt-4 mb-4 hover:bg-[#222629] transition duration-300 ease-in-out	 focus:outline-none " onClick={handleLogin} > {" "} Login{" "} </button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Admin;
