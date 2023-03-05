import React, { useState, useContext } from "react";
import whatsapp from "../assets/Images/whatsapp.png";
import instagram from "../assets/Images/instagram.webp";
import facebook from "../assets/Images/facebook.png";
import "../assets/CSS/index.css";
import { GrFormClose, GrMail } from "react-icons/gr";
import codeContext from "../context/CodeContext";
import swal from "sweetalert";
import Modal from "react-awesome-modal";

const Footer = () => {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [open, setOpen] = useState(false);
	const { contactForm } = useContext(codeContext);
	const socialIcons = [
		{
			title: "whatsapp",
			icon: whatsapp,
			path: "https://wa.me/918826271548",
		},
		{
			title: "instagram",
			icon: instagram,
			path: "https://www.instagram.com",
		},
		{ title: "facebook", icon: facebook, path: "https://www.facebook.com" },
	];

	const footLinks = [
		{
			heading: "Sections",
			links: [
				{ title: "Home", path: "/" },
				{ title: "About", path: "/about" },
				{ title: "Services", path: "/services" },
				{ title: "Contact", path: "/contact" },
			],
		},
		{
			heading: "Policies",
			links: [
				{ title: "Terms of Service", path: "/terms" },
				{ title: "Privacy Policy", path: "/privacy" },
			],
		},
	];

	const inputStyle =
		"w-full py-2 rounded-md border border-gray-600 px-2 focus:outline-none focus:border-[#E97500] text-black  ";
	const labelStyle = "text-gray-700 text-sm font-bold mt-4";
	return (
		<div className="w-full  bg-[#222629] border-t border-[#33343B]">
			<div className="w-full flex flex-col sm:flex-row gap-2 py-4">
				<div className="w-6/12 flex flex-col gap-2 justify-center items-center">
					<h1 className="text-gray-400 text-2xl font-bold text-center">
						{" "}
						Contact{" "}
					</h1>
					<div className="flex flex-col gap-2">
						<div className="flex gap-2 items-center">
							<GrMail className="text-gray-500 text-2xl" />
							<a
								className="text-gray-400 hover:text-gray-200"
								href="mailto: codetoday@gmail.com"
							>
								{" "}
								codetoday@gmail.com{" "}
							</a>
						</div>
					</div>
					<button className="bg-[#E97500] text-white px-4 py-2 rounded-md mt-4 hover:bg-[#F08A2B] focus:outline-none focus:ring-2 focus:ring-[#E97500] focus:ring-opacity-50 transition duration-300 ease-in-out" onClick = {()=>setOpen(true)} >
						Contact Us
					</button>
				</div>
				{/* <div className="w-4/12 flex justify-evenly">
					{footLinks.map((link) => (
						<div key={link.heading} className="flex flex-col gap-2">
							<h1 className="text-gray-400 text-2xl font-bold text-center">
								{" "}
								{link.heading}{" "}
							</h1>
							<div className="flex flex-col gap-2 items-center">
								{link.links.map((link) => (
									<div>
										<a
											className="text-gray-400 hover:text-gray-200"
											href={link.path}
											target="_blank"
											rel="noreferrer"
										>
											{" "}
											{link.title}{" "}
										</a>
									</div>
								))}
							</div>
						</div>
					))}
				</div> */}
				<div className="w-6/12 flex justify-center items-center">
					<div className="flex flex-col gap-4">
						<h1 className="text-gray-400 text-xl font-bold text-center">
							Connect With Us
						</h1>
						<div>
							<div className="flex justify-center gap-8">
								{socialIcons.map((icon) => (
									<a
										key={icon.title}
										href={icon.path}
										target="_blank"
										rel="noreferrer"
									>
										{" "}
										<img
											src={icon.icon}
											alt={icon.title}
											className="w-8 h-8"
										/>{" "}
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex w-full justify-center">
				<div className="w-[90%] h-[0.5px] bg-[#33343B] mt-4"></div>
			</div>
			<Modal
				visible={open}
				onClickAway={() => setOpen(false)}
				centered
				width="80%"
			>
				<div className="overflow-auto modals flex flex-col gap-4">
					<div className="flex justify-end items-center p-4">
						<GrFormClose
							className="text-2xl cursor-pointer text-gray-500 hover:text-gray-400"
							onClick={() => setOpen(false)}
						/>
					</div>

					<div className="flex flex-col rounded-md py-8 px-16">
						<h1 className="text-black text-2xl font-bold text-center">
							Contact Us
						</h1>

						{/* //contact form */}
						<div className="flex flex-col gap-2 mt-4 text-sm">
							<label className={labelStyle}>Name</label>
							<input
								type="text"
								placeholder="Name"
								className={inputStyle}
								value={form.name}
								onChange={(e) =>
									setForm({ ...form, name: e.target.value })
								}
							/>
							<label className={labelStyle}>Email</label>
							<input
								type="email"
								placeholder="Email"
								className={inputStyle}
								value={form.email}
								onChange={(e) =>
									setForm({ ...form, email: e.target.value })
								}
							/>
							<label className={labelStyle}>Your Message</label>
							<textarea
								placeholder="Message"
								className={inputStyle}
								value={form.message}
								onChange={(e) =>
									setForm({
										...form,
										message: e.target.value,
									})
								}
								rows={5}
							></textarea>
							{form.name !== "" &&
								form.email !== "" &&
								form.message !== "" && (
									<button
										className="w-full h-10 rounded-md bg-[#E97500] text-white font-bold hover:bg-[#33343B] hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent  "
										onClick={() => {
											contactForm(form);
											setForm({
												name: "",
												email: "",
												message: "",
											});
											swal({
												title: "Success!",
												text: "Your message has been sent!",
												icon: "success",
											});
										}}
									>
										Send
									</button>
								)}
						</div>
					</div>
				</div>
			</Modal>
			{/* //copyright reverved */}
			<div className="py-2">
				<h1 className="text-center text-sm text-gray-400">
					&copy; 2023 Code Today. All rights reserved.
				</h1>
			</div>
		</div>
	);
};

export default Footer;
