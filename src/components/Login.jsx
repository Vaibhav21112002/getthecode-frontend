import React, { useState, useEffect, useContext } from "react";
import "../assets/CSS/index.css";
import codeContext from "../context/CodeContext";
import swal from "sweetalert";
import { MdAdminPanelSettings } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { redirect, useNavigate } from "react-router-dom";

import login from "../assets/Images/login.svg";
const Login = () => {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(true);
	const [passwordVis, setPasswordVis] = useState(false);
	const [confirmPasswordVis, setConfirmPasswordVis] = useState(false);
	const [forgotPassword, setForgotPassword] = useState(false);
	const [checkOtp, setCheckOtp] = useState(false);
	const [email, setEmail] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		number: "",
	});
	const [enterNewPassword, setEnterNewPassword] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [cnfrmPassword, setCnfrmPassword] = useState("");
	const [otp, setOtp] = useState("");
	const {
		setLogin,
		Login,
		usrData,
		loading,
		Register,
		sendOtp,
		verifyOtp,
		changePassword,
	} = useContext(codeContext);

	const handleSendOtp = async () => {
		const token = await sendOtp(email);
		swal({
			title: `OTP sent successfull on ${email}`,
			icon: "success",
			button: "Ok",
		});
		if (token === undefined) {
			setCheckOtp(false);
			return;
		}
		// console.log(token);

		setCheckOtp(true);
	};

	const handleVerifyOtp = async () => {
		const msg = await verifyOtp(Number(otp));

		if (msg=="OTP verified successfully"){
			swal({title:"OTP verified",icon:'success',button:'Ok'});
			setEnterNewPassword(true);
		}
		else{
			swal({title:"Incorrect OTP entered",icon:'error',button:'Ok'});
		}
		

		// console.log(msg);
	};

	const handlePasswordChange = async () => {
		if (newPassword !== cnfrmPassword) {
			swal({
				title: "Passwords don't match",
				icon: "error",
				button: "Ok",
			});
			return;
		}
		const msg = await changePassword(newPassword);
		// console.log(msg);
		if (msg === "Password updated successfully") {
			swal({
				title: msg + ". Please log back in",
				icon: "success",
				button: "Ok",
			});
			setIsLogin(true);
			setPasswordVis(false);
			setConfirmPasswordVis(false);
			setForgotPassword(false);
			setCheckOtp(false);
			setEmail("");
			setFormData({
				name: "",
				email: "",
				password: "",
				confirmPassword: "",
				number: "",
			});
			setEnterNewPassword(false);
			setNewPassword("");
			setCnfrmPassword("");
			setOtp("");
		}
	};

	const lableStyle = "text-[#33343B] font-bold mx-auto text-sm mb-2  ";
	const inputStyle =
		"w-[70%] mx-auto h-[40px] rounded-md border-[#33343B] border-2 p-2 mb-4 focus:outline-none focus:border-[#33343B] focus:ring-2 focus:ring-[#33343B] focus:ring-opacity-50";

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

	const handleLogin = async () => {
		if (isLogin) {
			const email = formData.email.trim();
			const password = formData.password;
			const data = await Login({ email, password });
			if (data?.status === true) {
				localStorage.setItem("token", data?.token)
				navigate('/');
				swal({ title: data.message, icon: "success", button: "Ok" });
			} else {
				swal({ title: data.message, icon: "error", button: "Ok" });
			}
		} else {
			const email = formData.email.trim();
			const password = formData.password;
			const name = formData.name;
			const number = formData.number;
			if (password !== formData.confirmPassword) {
				swal({
					title: "Passwords do not match",
					icon: "error",
					button: "Ok",
				});
				return;
			}

			if (number.length !== 10 || number.match(/^[0-9]+$/) === false) {
				swal({
					title: "Incorrect phone number",
					icon: "error",
					button: "ok",
				});
				return;
			}

			const data = await Register({ email, password, name, number });
			if (data?.status === true) {
				navigate('/');
				swal({ title: data.message, icon: "success", button: "Ok" });

			} else {
				swal({ title: data.message, icon: "error", button: "Ok" });
			}
		}

		setFormData({
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			number: "",
		});
	};

	return (
		<div className="w-full h-[100vh] flex-col back">
			<div className="w-full flex h-[100vh]">
				<div className="w-1/2 hidden sm:flex flex-col justify-center items-center">
					<div className="text-white flex justify-start w-full gap-4 px-4">
						<IoIosArrowBack
							className="text-white text-2xl cursor-pointer"
							onClick={() => navigate("/")}
						/>
						<h1
							className="cursor-pointer	"
							onClick={() => navigate("/")}
						>
							Back To Home
						</h1>
					</div>
					<img src={login} alt="" className="w-[85%] h-[85%]" />
				</div>
				<div className="w-full sm:w-1/2 flex justify-center items-center">
					<div className="w-[90%] flex h-full justify-center items-center">
						{/* This is the login part */}
						{isLogin && !forgotPassword ? (
							<div className="w-full flex flex-col gap-4 py-4 bg-white items-center justify-center rounded-md h-[90%]">
								<div className="flex items-center gap-4 py-4">
									<h1 className="text-center text-[#222629]  font-bold text-2xl  ">
										{" "}
										Login{" "}
									</h1>
									<MdAdminPanelSettings className="text-[#33343B] text-4xl" />
								</div>
								<div className="flex flex-col w-full justify-center items-center">
									<div className="flex flex-col w-full">
										<label className={lableStyle}>
											{" "}
											Email{" "}
										</label>
										<input
											className={inputStyle}
											type="text"
											value={formData.email}
											onChange={(e) =>
												setFormData({
													...formData,
													email: e.target.value,
												})
											}
										/>
										<label className={lableStyle}>
											{" "}
											Password{" "}
										</label>
										<div className="flex ml-4">
											<input
												className={inputStyle}
												type={`${
													passwordVis
														? "text"
														: "password"
												}`}
												value={formData.password}
												onChange={(e) =>
													setFormData({
														...formData,
														password:
															e.target.value,
													})
												}
											/>
											<div className="relative right-[19%] top-2.5">
												{passwordVis ? (
													<AiFillEye
														onClick={() =>
															setPasswordVis(
																(prevState) =>
																	!prevState,
															)
														}
													/>
												) : (
													<AiFillEyeInvisible
														onClick={() =>
															setPasswordVis(
																(prevState) =>
																	!prevState,
															)
														}
													/>
												)}
											</div>
										</div>
									</div>
									<div className="mt-4">
										<h1
											className="text-[#33343B] cursor-pointer"
											onClick={() => {
												setForgotPassword(true);
											}}
										>
											Forgot Password ?{" "}
										</h1>
									</div>
									<button
										className="min-w-[40%] h-[40px] bg-[#33343B] text-white rounded-md mt-2 px-4 hover:bg-[#222629] transition duration-300 ease-in-out	 focus:outline-none "
										onClick={handleLogin}
									>
										{" "}
										Login{" "}
									</button>
									<h1 className="mt-4">
										Don't have an account?
										<span
											className="text-[#33343B] cursor-pointer"
											onClick={() => {
												setIsLogin(
													(prevState) => !prevState,
												);
											}}
										>
											{" "}
											Sign Up{" "}
										</span>
									</h1>
								</div>
							</div>
						) : forgotPassword && !checkOtp ? (
							<div className="w-full flex flex-col gap-4 py-4 bg-white items-center justify-center rounded-md h-[90%]">
								{/* This is the forgot password part of the code */}
								<div className="w-full h-full flex justify-center items-center my-auto">
									<div className="w-[70%] h-[70%] bg-white rounded-md flex flex-col items-center">
										<div className="flex items-center gap-4">
											<h1 className="text-center text-[#222629]  font-bold text-2xl mt-10 mb-10  ">
												{" "}
												Forgot Password?{" "}
											</h1>
										</div>
										<div className="flex flex-col w-full justify-center items-center">
											<div className="flex flex-col w-full">
												<label className={lableStyle}>
													{" "}
													Email{" "}
												</label>
												<input
													className={inputStyle}
													type="email"
													value={email}
													onChange={(e) =>
														setEmail(e.target.value)
													}
												/>
											</div>
											<button
												className="w-[40%] h-[40px] bg-[#33343B] text-white rounded-md mt-4 mb-4 hover:bg-[#222629] transition duration-300 ease-in-out	 focus:outline-none "
												onClick={() => {
													handleSendOtp();
												}}
											>
												Send OTP
											</button>
										</div>
									</div>
								</div>
							</div>
						) : checkOtp && !enterNewPassword ? (
							<div className="w-full flex flex-col gap-4 py-4 bg-white items-center justify-center rounded-md h-[90%]">
								{/* This is the forgot password part of the code */}
								<div className="w-full h-full flex justify-center items-center my-auto">
									<div className="w-[70%] h-[70%] bg-white rounded-md flex flex-col items-center">
										<div className="flex items-center gap-4">
											<h1 className="text-center text-[#222629]  font-bold text-2xl mt-10 mb-10  ">
												{" "}
												Verify OTP{" "}
											</h1>
										</div>
										<div className="flex flex-col w-full justify-center items-center">
											<div className="flex flex-col w-full">
												<label className={lableStyle}>
													{" "}
													{`Enter OTP sent on ${email}`}{" "}
												</label>
												<input
													className={inputStyle}
													type="number"
													value={otp}
													onChange={(e) =>
														setOtp(e.target.value)
													}
												/>
											</div>
											<button
												className="w-[40%] h-[40px] bg-[#33343B] text-white rounded-md mt-4 mb-4 hover:bg-[#222629] transition duration-300 ease-in-out	 focus:outline-none "
												onClick={() => {
													handleVerifyOtp();
												}}
											>
												Confirm OTP
											</button>
										</div>
									</div>
								</div>
							</div>
						) : enterNewPassword ? (
							<div className={` w-[90%]  flex flex-col gap-4 py-4 bg-white items-center justify-center rounded-md h-[90%]`}>
								<div className="w-full h-full flex justify-center items-center mt-[10%]">
									<div className="w-[70%] h-[100%] bg-white rounded-md  flex flex-col items-center">
										<div className="flex items-center gap-4">
											<h1 className="text-center text-[#222629]  font-bold text-2xl mt-3 mb-3 ">
												{" "}
												Enter new password{" "}
											</h1>
										</div>
										<div className="flex flex-col w-full justify-center items-center">
											<div className="flex flex-col w-full">
												<label className={lableStyle}>
													{" "}
													New Password{" "}
												</label>
												<div className="flex ml-4">
													<input
														className={inputStyle}
														type={`${
															passwordVis
																? "text"
																: "password"
														}`}
														value={newPassword}
														onChange={(e) =>
															setNewPassword(
																e.target.value,
															)
														}
													/>
													<div className="relative right-[19%] top-2.5">
														{passwordVis ? (
															<AiFillEye
																onClick={() =>
																	setPasswordVis(
																		(
																			prevState,
																		) =>
																			!prevState,
																	)
																}
															/>
														) : (
															<AiFillEyeInvisible
																onClick={() =>
																	setPasswordVis(
																		(
																			prevState,
																		) =>
																			!prevState,
																	)
																}
															/>
														)}
													</div>
												</div>
												<label className={lableStyle}>
													{" "}
													Confirm New Password{" "}
												</label>
												<div className="flex ml-4">
													<input
														className={inputStyle}
														type={`${
															confirmPasswordVis
																? "text"
																: "password"
														}`}
														value={cnfrmPassword}
														onChange={(e) =>
															setCnfrmPassword(
																e.target.value,
															)
														}
													/>
													<div className="relative right-[19%] top-2.5">
														{passwordVis ? (
															<AiFillEye
																onClick={() =>
																	setConfirmPasswordVis(
																		(
																			prevState,
																		) =>
																			!prevState,
																	)
																}
															/>
														) : (
															<AiFillEyeInvisible
																onClick={() =>
																	setConfirmPasswordVis(
																		(
																			prevState,
																		) =>
																			!prevState,
																	)
																}
															/>
														)}
													</div>
												</div>
											</div>
											<button
												className="w-[50%] max-h-[150px] min-h-[40px] bg-[#33343B] text-white rounded-md mt-4 mb-4 hover:bg-[#222629] transition duration-300 ease-in-out	 focus:outline-none "
												onClick={handlePasswordChange}
											>
												{" "}
												Change my Password{" "}
											</button>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="w-full flex flex-col gap-4 py-4 bg-white items-center justify-center rounded-md h-[90%]">
								<div className="flex items-center gap-4">
									<h1 className="text-center text-[#222629]  font-bold text-2xl mt-3 mb-3 ">
										{" "}
										Sign Up{" "}
									</h1>
									<MdAdminPanelSettings className="text-[#33343B] text-4xl" />
								</div>
								<div className="flex flex-col w-full justify-center items-center">
									<div className="flex flex-col w-full">
										<label className={lableStyle}>
											{" "}
											Name{" "}
										</label>
										<input
											className={inputStyle}
											type="text"
											value={formData.name}
											onChange={(e) =>
												setFormData({
													...formData,
													name: e.target.value,
												})
											}
										/>
										<label className={lableStyle}>
											{" "}
											Email{" "}
										</label>
										<input
											className={inputStyle}
											type="text"
											value={formData.email}
											onChange={(e) =>
												setFormData({
													...formData,
													email: e.target.value,
												})
											}
										/>
										<label className={lableStyle}>
											{" "}
											Contact Number{" "}
										</label>
										<input
											className={inputStyle}
											type="text"
											value={formData.number}
											onChange={(e) =>
												setFormData({
													...formData,
													number: e.target.value,
												})
											}
										/>
										<label className={lableStyle}>
											{" "}
											Password{" "}
										</label>
										<div className="flex ml-4">
											<input
												className={inputStyle}
												type={`${
													passwordVis
														? "text"
														: "password"
												}`}
												value={formData.password}
												onChange={(e) =>
													setFormData({
														...formData,
														password:
															e.target.value,
													})
												}
											/>
											<div className="relative right-[19%] top-2.5">
												{passwordVis ? (
													<AiFillEye
														onClick={() =>
															setPasswordVis(
																(prevState) =>
																	!prevState,
															)
														}
													/>
												) : (
													<AiFillEyeInvisible
														onClick={() =>
															setPasswordVis(
																(prevState) =>
																	!prevState,
															)
														}
													/>
												)}
											</div>
										</div>
										<label className={lableStyle}>
											{" "}
											Confirm Password{" "}
										</label>
										<div className="flex ml-4">
											<input
												className={inputStyle}
												type={`${
													confirmPasswordVis
														? "text"
														: "password"
												}`}
												value={formData.confirmPassword}
												onChange={(e) =>
													setFormData({
														...formData,
														confirmPassword:
															e.target.value,
													})
												}
											/>
											<div className="relative right-[19%] top-2.5">
												{passwordVis ? (
													<AiFillEye
														onClick={() =>
															setConfirmPasswordVis(
																(prevState) =>
																	!prevState,
															)
														}
													/>
												) : (
													<AiFillEyeInvisible
														onClick={() =>
															setConfirmPasswordVis(
																(prevState) =>
																	!prevState,
															)
														}
													/>
												)}
											</div>
										</div>
									</div>

									<button
										className="min-w-[40%] h-[40px] bg-[#33343B] text-white rounded-md px-4 mt-2 hover:bg-[#222629] transition duration-300 ease-in-out      focus:outline-none "
										onClick={handleLogin}
									>
										{" "}
										Sign Up{" "}
									</button>
									<button
										className="text-left cursor-pointer mt-2"
										onClick={() => {
											setIsLogin(
												(prevState) => !prevState,
											);
										}}
									>
										Already a user? Login
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
