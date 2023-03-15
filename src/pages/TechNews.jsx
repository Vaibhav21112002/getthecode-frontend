import React, { useState, useEffect, useContext, useRef } from "react";
import { Navbar, Footer } from "../components";
import "../assets/CSS/index.css";
import { useNavigate } from "react-router-dom";
import Parser from "html-react-parser";
import codeContext from "../context/CodeContext";
import { pagination } from "../assets/Constants";

const TechNews = () => {
	const [qpp, setQpp] = useState(10);
	const [page, setPage] = useState(1);
	const [data, setData] = useState([]);
	const [activeFilter, setActiveFilter] = useState("All Tech News");
	const { getTechNews, techNews } = useContext(codeContext);
	const [companies, setCompanies] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [filteredCompanies, setFilteredCompanies] = useState(companies);
	const [isFocused, setIsFocused] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const totalPages = Math.ceil(data.length / qpp);
	const paginateButtons = `w-24 h-8 rounded-md bg-[#E97500] text-white text-[0.8rem] font-bold flex justify-center items-center cursor-pointer hover:bg-[#FFA500]`;

	const inputRef = useRef(null);
	const handleInputFocus = () => {
		setIsFocused(true);
	};

	const handleInputBlur = () => {
		setIsFocused(false);
	};

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
		if (e.target.value === "") {
			setFilteredCompanies(companies);
		}
		setFilteredCompanies(
			companies.filter(
				(company) =>
					company
						.toLowerCase()
						.indexOf(e.target.value.toLowerCase()) !== -1,
			),
		);
	};

	const handleOptionClick = (value) => {
		setInputValue(value);
		setFilteredCompanies(companies);
		setData(
			techNews.filter(
				(techNew) =>
					techNew.company
						.toLowerCase()
						.indexOf(value.toLowerCase()) !== -1,
			),
		);
		inputRef.current.blur();
	};

	useEffect(() => {
		getTechNews();
		const usrToken = localStorage.getItem("token");
    if (usrToken === undefined||usrToken===null) {
      navigate("/");
    } 
	}, []);

	useEffect(() => {
		setData(techNews);
		if (data.length > 0) {
			let comp = [];
			data.map((techNew) => {
				if (techNew.tag === "Interview Experiences") {
					comp.push(techNew.company.toLowerCase());
				}
			});
			let uniqueCompanies = comp.filter(
				(item, index) => comp.indexOf(item) === index,
			);
			setCompanies(uniqueCompanies);
			setFilteredCompanies(companies);
		}
	}, [techNews]);

	const navigate = useNavigate();

	const handleTopicFilter = (topic) => {
		if (activeFilter === topic) return;
		if (topic !== "Interview Experiences") {
			setInputValue("");
		}
		setActiveFilter(topic);
		if (topic === "All Tech News") {
			setData(techNews);
		} else {
			const filteredTechNews = [];
			techNews.map((techNew) => {
				if (techNew.tag === topic) {
					filteredTechNews.push(techNew);
				}
			});
			setData(filteredTechNews);
		}
	};

	const topics = [
		{ title: "All Tech News" },
		{ title: "Interview Experiences" },
		{ title: "Latest Tech Innovations" },
		{ title: "Miscellaneous" },
	];

	const TechNewsCard = ({ techNew, index }) => {
		return (
			<div className="w-[75vw] h-[15rem] flex">
				<div className="w-3/12 h-full ">
					<div className="relative w-[16rem] h-[12rem]  mt-[26px] right-[-6rem]  z-[1]">
						<img
							src={techNew.image}
							className="w-full h-full rounded-md"
							alt="techNew"
						/>
					</div>
				</div>
				<div className="w-9/12 bg-white h-full rounded-md boxes text-[#BDA9A9]">
					<div className="h-full w-full pl-[8rem] py-4 pr-8 flex flex-col justify-between">
						<div>
							<h1 className="text-[#222629] text-lg font-bold">
								{techNew.title}
							</h1>
							<h1 className="text-sm">#{techNew.keywords}</h1>

							<h1 className="text-[#222629] text-sm text-justify mt-2">
								{Parser(
									techNew.content.length > 150
										? techNew.content.slice(0, 150) + "..."
										: techNew.content,
								)}
							</h1>
							<button
								className="bg-[#ED8A11] px-6 py-2 rounded-lg mt-2 flex justify-center items-center hover:bg-[#F2A03F] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer"
								onClick={() =>
									navigate(`/techNews/${techNew?._id}`)
								}
							>
								<h1 className="text-white text-sm font-bold">
									Read More
								</h1>
							</button>
						</div>

						<div className="flex justify-start">
							<h1 className="text-sm h-full flex content-end">
								#{techNew.tag}
							</h1>
							{"    "}
							{techNew.company && (
								<h1 className="text-sm h-full flex content-end">
									#{techNew.company}
								</h1>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	};
	return (
		<div className="back">
			<Navbar />
			<div className="w-full flex bg-[#222629] z-0">
				<div className="w-full flex flex-col py-8 text-[white] px-20">
					<div className="py-1 flex justify-between">
						<h1
							className="
                            text-center text-[white] text-2xl font-bold px-4 py-12 mx-auto
                        "
						>
							The Digital Frontline - All the latest tech news at
							your fingertips
						</h1>
						<div className="flex justify-center items-center float-right">
							<div className="relative inline-block w-full">
								<select
									value={activeFilter}
									onChange={(e) => {
										handleTopicFilter(e.target.value);
									}}
									className="block appearance-none w-full border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline text-black"
								>
									{topics.map((topic) => (
										<option
											value={topic.title}
											key={topic.title}
										>
											{topic.title}
										</option>
									))}
								</select>
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
									<svg
										className="fill-current h-4 w-4"
										viewBox="0 0 20 20"
									>
										<path d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7l-5 5z" />
									</svg>
								</div>
							</div>
						</div>
					</div>
					{activeFilter === "Interview Experiences" && (
						<div className="company-input flex flex-col ease-in-out mb-12 justify-center items-center z-10">
							<input
								type="text"
								value={inputValue}
								onChange={handleInputChange}
								onFocus={handleInputFocus}
								onBlur={handleInputBlur}
								ref={inputRef}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										console.log(inputValue);
										setFilteredCompanies(companies);
										setData(
											techNews.filter(
												(techNew) =>
													techNew.company.toLowerCase() ===
													inputValue,
											),
										);
										inputRef.current.blur();
									}
								}}
								placeholder="Select a company"
								className="text-black w-[70%] h-[30px] text-center rounded-[8px]"
							/>
							{isFocused && filteredCompanies.length > 0 && (
								<ul className="dropdown mt-2">
									{filteredCompanies.map((company, index) => (
										<li
											className="cursor-pointer"
											key={index}
											onClick={() =>
												handleOptionClick(company)
											}
											onMouseDown={(e) =>
												e.preventDefault()
											}
										>
											{company.slice(0, 1).toUpperCase()}
											{company.slice(1, company.length)}
										</li>
									))}
								</ul>
							)}
						</div>
					)}
					<div className="py-1 flex flex-wrap gap-16">
						{data
							.slice((page - 1) * qpp, page * qpp)
							.map((techNew, index) => (
								<TechNewsCard techNew={techNew} key={index} />
							))}
					</div>
					<div className="w-full flex justify-between items-center mt-4 gap-4">
						<div className="w-full flex justify-center items-center mt-4 gap-4">
							<select
								className="
								w-36 h-8 px-4 text-sm text-gray-500 placeholder-gray-500 border rounded-lg focus:shadow-outline placeholder-[#E97500] border-[#E97500] focus:outline-none focus:border-[#E97500] 
								"
								onChange={(e) => setQpp(e.target.value)}
							>
								{pagination.map((item, index) => {
									return (
										<option
											key={index}
											value={item.value}
											className="text-[#000]"
										>
											{item.text}
										</option>
									);
								})}
							</select>
						</div>

						<div className="w-full flex justify-center items-center mt-4 gap-4">
							<button
								className={paginateButtons}
								onClick={() => setPage(page - 1)}
								disabled={page === 1}
							>
								Prev
							</button>
							<h1 className=" text-white font-bold text-sm">
								{page} of {totalPages}
							</h1>
							<button
								className={paginateButtons}
								onClick={() => setPage(page + 1)}
								disabled={page === totalPages}
							>
								Next
							</button>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default TechNews;
