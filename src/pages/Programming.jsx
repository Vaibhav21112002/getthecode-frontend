import React, { useState, useEffect, useContext } from "react";
import { Navbar, Footer } from "../components";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../assets/CSS/index.css";
import CodeContext from "../context/CodeContext";
import Void from "../assets/Images/Void.svg";
import Modal from "react-awesome-modal";
import Editor from "@monaco-editor/react";
import { AiOutlineLink, AiOutlineClose } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
import {
	topics,
	companies_new as companies,
	pagination,
} from "../assets/Constants";

const Programming = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [editData, setEditData] = useState({});
	const [solutionOpen, setSolutionOpen] = useState(false);
	const { questions, getQuestions } = useContext(CodeContext);
	const [qpp, setQpp] = useState(10);
	const [page, setPage] = useState(1);
	const [activeFilter, setActiveFilter] = useState("All Questions");
	const [language, setLanguage] = useState("java");
	const totalPages = Math.ceil(data.length / qpp);
	const handleTopicFilter = (topic) => {
		if (activeFilter === topic) return;
		setActiveFilter(topic);
		if (topic === "All Questions") {
			setData(questions);
		} else {
			const newData = questions.filter((item) =>
				item.topicTag.includes(topic),
			);
			setData(newData);
		}
	};

	const difficultyFilter = (difficulty) => {
		if (activeFilter === difficulty) return;
		setActiveFilter(difficulty);
		if (difficulty === "All Questions") {
			setData(questions);
		} else {
			const newData = questions.filter(
				(item) => item.difficulty === difficulty,
			);
			setData(newData);
		}
	};

	const companyFilter = (company) => {
		if (company === "All Questions") {
			setData(questions);
		} else {
			const newData = questions.filter((item) =>
				item.companyTag.includes(company),
			);
			setData(newData);
		}
	};

	const setSearch = (e) => {
		const newData = questions.filter((item) =>
			item.title.toLowerCase().includes(e.toLowerCase()),
		);
		setData(newData);
	};

	useEffect(() => {
		if (activeFilter !== "All Questions") return;
		getQuestions();
		// eslint-disable-next-line
	}, []);

	console.log(editData);
	useEffect(() => {
		if (activeFilter !== "All Questions") return;
		setData(questions);
	}, [questions]);
	const TableComponent = ({ item }) => {
		return (
			<tr className="bg-white border-b dark:bg-gray-800 text-[0.76rem]">
				<th
					scope="row"
					className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:text-blue-600 dark:hover:text-blue-500 cursor-pointer"
					onClick={() => navigate("/programming/" + item._id)}
				>
					{item.title}
				</th>
				<td className="py-4 px-6">
					<BsFileEarmarkSpreadsheet
						className="text-2xl cursor-pointer hover:text-blue-600 dark:hover:text-blue-500
                        
                    "
						onClick={() => {
							setEditData(item);
							setSolutionOpen(true);
						}}
					/>
				</td>
				{item.difficulty === "easy" ? (
					<td className="py-4 px-6 text-[#008000]">Easy</td>
				) : item.difficulty === "medium" ? (
					<td className="py-4 px-6 text-[#FFA500]">Medium</td>
				) : (
					<td className="py-4 px-6 text-[#FF0000]">Hard</td>
				)}
				<td className="py-4 px-6">{item.score}</td>
				<td className="py-4 px-6">
					{item.link ? (
						<AiOutlineLink
							className="text-2xl cursor-pointer text-blue-600"
							onClick={() => window.open(item.link)}
						/>
					) : (
						<FcCancel className="text-2xl" />
					)}
				</td>
			</tr>
		);
	};

	const dropdownClass =
		"w-full h-full border-none outline-none text-[0.8rem] text-gray-500 dark:text-gray-400 pl-4 pr-8 rounded-lg bg-white bg-no-repeat bg-right-4 bg-[#E97500] cursor-pointer";

	const paginateButtons = `w-24 h-8 rounded-md bg-[#E97500] text-white text-[0.8rem] font-bold flex justify-center items-center cursor-pointer hover:bg-[#FFA500]`;
	return (
		<div className="back">
			<Navbar />
			<div className="w-full sm:px-4 px-2 py-8  bg-[#222629] ">
				<div className="py-8 w-full flex flex-col justify-center items-center mt-4">
					<h1 className="text-center text-[white] text-2xl font-bold px-4 py-12">
						Your Programming Questions
					</h1>
					<div className="w-full flex  px-16 gap-4 ">
						<div className="w-full flex flex-wrap gap-4">
							<div
								className="h-10 
							relative inline-flex rounded-md shadow-sm"
							>
								<select
									className={dropdownClass}
									onChange={(e) =>
										difficultyFilter(e.target.value)
									}
									placeholder="Difficulty"
								>
									<option
										value=""
										className="text-[#000]"
										disabled
										selected
										hidden
									>
										Difficulty
									</option>
									<option
										value="All Questions"
										className="text-[#000]"
									>
										All Questions
									</option>
									<option
										value="easy"
										className="text-[#008000]"
									>
										Easy
									</option>
									<option
										value="medium"
										className="text-[#FFA500]"
									>
										Medium
									</option>
									<option
										value="hard"
										className="text-[#FF0000]"
									>
										Hard
									</option>
								</select>
							</div>
							<div
								className="h-10 
							relative inline-flex rounded-md shadow-sm"
							>
								<select
									className={dropdownClass}
									onChange={(e) =>
										companyFilter(e.target.value)
									}
									placeholder="Companies"
								>
									<option
										value="All Questions"
										className="text-[#000]"
										disabled
										selected
										hidden
									>
										Companies
									</option>
									<option
										value="All Questions"
										className="text-[#000]"
									>
										All Questions
									</option>
									{companies.map((topic, index) => {
										return (
											<option
												key={index}
												value={topic.title}
												className="text-[#000]"
											>
												{topic.title}
											</option>
										);
									})}
								</select>
							</div>
							<div
								className="h-10 
							relative inline-flex rounded-md shadow-sm"
							>
								<select
									className={dropdownClass}
									onChange={(e) =>
										handleTopicFilter(e.target.value)
									}
									placeholder="Topics"
								>
									<option
										value="All Questions"
										className="text-[#000]"
										disabled
										selected
										hidden
									>
										Topics
									</option>
									{topics.map((topic, index) => {
										return (
											<option
												key={index}
												value={topic.title}
												className="text-[#000]"
											>
												{topic.title}
											</option>
										);
									})}
								</select>
							</div>
						</div>
						<div className="w-full flex ">
							{/* //Implement Search Bar Based on Index Based Search on the title of the questions */}
							<div className="w-full flex flex-col justify-end text-sm">
								<input
									type="text"
									className="w-full h-10 px-4 text-base text-gray-500 placeholder-gray-500 border rounded-lg focus:shadow-outline placeholder-[#E97500] border-[#E97500] focus:outline-none focus:border-[#E97500] "
									placeholder="Search"
									onChange={(e) => {
										setSearch(e.target.value);
									}}
								/>
							</div>
						</div>
					</div>
					<div className="w-[90%] mt-4">
						<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
							<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead
									className={`text-xs text-[WHITE] uppercase bg-[#E97500]`}
								>
									<tr>
										<th scope="col" className="py-3 px-6">
											Title
										</th>
										<th scope="col" className="py-3 px-6">
											Solution
										</th>
										<th scope="col" className="py-3 px-6">
											Difficutly
										</th>
										<th scope="col" className="py-3 px-6">
											Score
										</th>
										<th scope="col" className="py-3 px-6">
											Link
										</th>
									</tr>
								</thead>

								{data.length > 0 ? (
									<tbody>
										{data
											.slice((page - 1) * qpp, page * qpp)
											.map((item, index) => {
												return (
													<TableComponent
														key={index}
														title={item.title}
														id={item._id}
														item={item}
													/>
												);
											})}
									</tbody>
								) : (
									<></>
								)}
							</table>
						</div>
						{data.length === 0 && (
							<div className="w-full flex flex-col gap-12 justify-center items-center py-12">
								<img
									src={Void}
									alt="Void"
									className="w-[20rem] h-[20rem]"
								/>
								<h1 className="text-2xl font-bold text-[#BDA9A9]">
									No Questions Found
								</h1>
							</div>
						)}
					</div>
					{/* //Pagination */}
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
					{/* Solution Modal */}
					<Modal
						visible={solutionOpen}
						onClickAway={() => setSolutionOpen(false)}
						title="Solution"
						width="90%"
						height="90%"
					>
						<div className="h-[100%] overflow-auto modals text-[0.76rem]">
							<div className="flex w-full justify-end px-4 py-4">
								<AiOutlineClose
									className="text-black hover:font-bold text-[20px] cursor-pointer"
									onClick={() => setSolutionOpen(false)}
								/>
							</div>
							<div className="w-full flex flex-col gap-4 justify-center items-center">
								<h1 className="text-center font-bold text-2xl">
									Solution
								</h1>{" "}
								<div className="relative w-full flex items-center justify-center">
									<select
										value={language}
										onChange={(e) => {
											setLanguage(e.target.value);
										}}
										className="block appearance-none w-[40%] text-center justify-between border border-white hover:border-gray-800 bg-black text-white px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
									>
										<option value="java">Java</option>
										<option value="cpp">C++</option>
										<option value="python">Python</option>
									</select>
									<div className="pointer-events-none inset-y-0 absolute ml-[37%] flex items-center px-2 text-white">
										<svg
											className="fill-current h-4 w-4"
											viewBox="0 0 20 20"
										>
											<path d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7l-5 5z" />
										</svg>
									</div>
								</div>
								{editData.solution && (
									<div className="w-full flex justify-center items-center flex-col py-4">
										<div className="w-[90%] h-[30px] bg-[#1E1E1E] rounded-t-2xl"></div>
										<Editor
											height="60vh"
											width={`90%`}
											theme="vs-dark"
											defaultLanguage="java"
											value={`${editData.solution[language]}`}
											options={{ readOnly: true }}
											tabIndex={4}
										/>
										<div className="w-[90%] h-[30px] bg-[#1E1E1E] rounded-b-2xl mt-[-4px]"></div>
									</div>
								)}
							</div>
						</div>
					</Modal>
				</div>
			</div>
			<Footer />
		</div>
	);
};
export default Programming;
