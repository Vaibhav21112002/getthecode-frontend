import React, { useState, useContext } from "react";
import whatsapp from "../assets/Images/whatsapp.png";
import instagram from "../assets/Images/instagram.webp";
import facebook from "../assets/Images/facebook.png";
import { GrMail } from "react-icons/gr";
import codeContext from "../context/CodeContext";
import swal from "sweetalert";

const Footer = () => {
	const [form, setForm] = useState({ name: "", email: "", message: "", });
	const { contactForm } = useContext(codeContext);
	const socialIcons = [
		{ title: "whatsapp", icon: whatsapp, path: "https://wa.me/918826271548", },
		{ title: "instagram", icon: instagram, path: "https://www.instagram.com", },
		{ title: "facebook", icon: facebook, path: "https://www.facebook.com", },
	];

	const links1 = [
		{ title: "Home", path: "/", },
		{ title: "About", path: "/about", },
		{ title: "Services", path: "/services", },
		{ title: "Contact", path: "/contact", },
	];

	const policyLinks = [
		{ title: "Terms of Service", path: "/terms", },
		{ title: "Privacy Policy", path: "/privacy", },
	];

	const inputStyle =
		"w-full py-2 rounded-md border border-[#33343B] px-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent bg-[#33343B]";
	return (
		<div className="w-full min-h-[25vh] bg-[#222629] border-t border-[#33343B]">
			<div className="w-full flex gap-2 py-4">
				<div className="w-4/12 flex justify-center items-center">
					<div className="flex flex-col rounded-md py-8 px-4 border border-gray-600 ">
						<h1 className="text-gray-400 text-2xl font-bold text-center">
							Inquire
						</h1>

						{/* //contact form */}
						<div className="flex flex-col gap-2 mt-4 text-sm">
							<input type="text" placeholder="Name" className={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value }) } />
							<input type="email" placeholder="Email" className={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value }) } />
							<textarea placeholder="Message" className={inputStyle} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value, }) } rows={5} ></textarea>
							{form.name !== "" && form.email !== "" && form.message !== "" && (
									<button className="w-full h-10 rounded-md bg-[#E97500] text-white font-bold hover:bg-[#33343B] hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent  "
										onClick={() => { contactForm(form); setForm({ name: "", email: "", message: "", });
											swal({ title: "Success!", text: "Your message has been sent!", icon: "success", });
										}} >
										Send
									</button>
								)}
						</div>
					</div>
				</div>
				<div className="w-4/12 flex justify-evenly pt-12">
					<div className="flex flex-col gap-4">
						{/* //links */}
						<div className="flex flex-col gap-2">
							<h1 className="text-gray-400 text-2xl font-bold">
								Sections
							</h1>
							<div className="flex flex-col gap-2">
								{links1.map((link) => (
									<a
										key={link.title}
										href={link.path}
										className="text-gray-400 hover:text-gray-200"
									>
										{link.title}
									</a>
								))}
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-4">
						{/* //links */}
						<div className="flex flex-col gap-2">
							<h1 className="text-gray-400 text-2xl font-bold">
								Policies
							</h1>
							<div className="flex flex-col gap-2">
								{policyLinks.map((link) => (
									<a
										key={link.title}
										href={link.path}
										className="text-gray-400 hover:text-gray-200"
									>
										{link.title}
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="w-4/12 flex justify-center pt-12">
					{/* //Contact info */}
					<div className="flex flex-col gap-4">
						<h1 className="text-gray-400 text-2xl font-bold text-center"> Contact </h1>
						<div className="flex flex-col gap-2">
							<div className="flex gap-2 items-center">
								<GrMail className="text-gray-500 text-2xl" />
								<a className="text-gray-400 hover:text-gray-200" href="mailto: getthecode@gmail.com" > getthecode@gmail.com </a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex w-full justify-center">
				<div className="w-[90%] h-[0.5px] bg-[#33343B] my-4"></div>
			</div>
			{/* //copyright reverved */}
			<div className="py-2">
				<div>
					<div className="flex justify-center gap-8">
						{socialIcons.map((icon) => (
							<a key={icon.title} href={icon.path} target="_blank" rel="noreferrer" > <img src={icon.icon} alt={icon.title} className="w-8 h-8" /> </a>
						))}
					</div>
				</div>
				<h1 className="text-center text-gray-400 mt-2">
					&copy; 2023 GetTheCode. All rights reserved.
				</h1>
			</div>
		</div>
	);
};

export default Footer;
