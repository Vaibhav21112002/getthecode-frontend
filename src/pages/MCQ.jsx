import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../components";
import "../assets/CSS/index.css";
import codeContext from "../context/CodeContext";
import { topics } from "../assets/Constants";
import swal from "sweetalert";

const MCQ = () => {
	const [data, setData] = useState([]);
	const { getMcqs, mcqs } = useContext(codeContext);
	const [selected, setSelected] = useState([]);

	useEffect(() => {
		getMcqs();
	}, []);

	useEffect(() => {
		setData(mcqs);
		for (let i = 0; i < mcqs.length; i++) {
			selected.push(0);
		}
		setSelected(selected);
	}, [mcqs]);

	const [answersVisible, setAnswersVisible] = useState(
		new Array(mcqs.length).fill(false),
	);

	const toggleAnswerVisibility = (index) => {
		const newAnswersVisible = [...answersVisible];
		newAnswersVisible[index] = !newAnswersVisible[index];
		setAnswersVisible(newAnswersVisible);
	};

	return (
		<div className="back bg-[#222629]">
			<Navbar />
			<div className="w-full flex bg-[#222629] z-0">
				<div className="w-full flex flex-col py-8 text-[white] px-20">
					<div className=" flex flex-col">
						<h1 className="text-center text-[white] text-2xl font-bold px-4 ">
							MCQs
						</h1>
					</div>
					{/* //toipcs tags with data filtering */}
					<div className="flex flex-wrap justify-center mt-4 gap-4">
						{topics.map((topic, index) => {
							return (
								<button
									className="sm:w-[16rem] w-[10rem] text-[white]  flex justify-center items-center sm:px-6 px-4 py-2 rounded-lg shadow-xl cursor-pointer bg-[#E97500] border-[#E97500] hover:bg-[#202128] hover:text-[white]"
									onClick={() => {
										const filteredData = mcqs.filter(
											(mcq) =>
												mcq.topicTag === topic.title,
										);
										topic.title == "All Questions"
											? setData(mcqs)
											: setData(filteredData);
									}}
								>
									{topic.title}
								</button>
							);
						})}
					</div>
					<div className="flex flex-col w-full mt-8">
						{data.map((mcq, index) => {
							return (
								<div className=" text-black w-full p-4 bg-white rounded-md 	 shadow-lg mb-4 flex flex-col  ">
									<div
										className=" px-10 rounded-[16px]flex"
										key={index}
									>
										<div className="flex flex-col w-full ml-6">
											<div className="w-full mt-2 ">
												<h1 className="text-md text-justify ">{`Q${
													index + 1
												} ${". " + mcq.question}`}</h1>
											</div>
											<h1 className="text-lg mt-4	">
												{" "}
												Options{" "}
											</h1>
											<div className="mt-3 mb-3 flex flex-col pl-4">
												{mcq.options.map(
													(option, index1) => (
														<div className="flex">
															<input
																type="radio"
																className="mr-2"
																name={index}
																value={
																	option.no
																}
																onChange={() => {
																	const newSelected =
																		[
																			...selected,
																		];
																	newSelected[
																		index
																	] =
																		option.no;
																	setSelected(
																		newSelected,
																	);
																}}
															/>

															<div>
																<span
																	className={`text-sm mb-3 ${
																		answersVisible[
																			index
																		] &&
																		option.no ===
																			mcq.answer
																			? "text-green-500"
																			: answersVisible[
																					index
																			  ] &&
																			  option.no !==
																					mcq.answer
																			? "text-red-500"
																			: ""
																	}`}
																	key={index1}
																>
																	{" "}
																	{`${option.no}. ${option.text}`}{" "}
																</span>
																{/* Option Image */}

																{option.image &&
																	option.image !=
																		"" && (
																		<div>
																			<img
																				src={
																					option.image
																				}
																				className="w-[100px] h-[100px] mt-2 pl-4"
																				alt="images"
																			/>
																		</div>
																	)}
															</div>
														</div>
													),
												)}
												<button
													className=" bg-[#222629] text-sm rounded-md text-center mb-6 w-2/12 inline-block text-white py-2 px-4 mt-4 "
													onClick={() => {
														if (!selected[index]) {
															swal({
																title: "Please select an option",
																icon: "error",
															});
															return;
														}
														toggleAnswerVisibility(
															index,
														);
													}}
												>
													{" "}
													{(answersVisible[index]
														? "Hide"
														: "Show") +
														" Answer"}{" "}
												</button>
												{answersVisible[index] && (
													<div className=" mt-3">
														<span className="font-bold">
															{" "}
															Answer :{" "}
														</span>
														{mcq.options.map(
															(option, index) => {
																if (
																	option.no ===
																	mcq.answer
																) {
																	return (
																		<div>
																			<span
																				className="text-sm mb-3 "
																				key={
																					index
																				}
																			>
																				{" "}
																				{`${option.no}. ${option.text}`}{" "}
																			</span>
																			{option.image &&
																				option.image !=
																					"" && (
																					<div>
																						<img
																							src={
																								option.image
																							}
																							className="w-[100px] h-[100px] mt-2 pl-4"
																							alt="images"
																						/>
																					</div>
																				)}
																		</div>
																	);
																}
															},
														)}
													</div>
												)}
											</div>
											{mcq.topicTag &&
												mcq.topicTag != "" && (
													<span
														className={`text-[#E97500] font-bold text-[0.9rem]`}
													>
														# {mcq.topicTag}
													</span>
												)}
										</div>
									</div>
								</div>
							);
						})}
					</div>
					{data.length == 0 && (
						<div className="flex flex-col justify-center items-center">
							<h1 className="text-2xl font-bold text-[white]">
								No Questions Found
							</h1>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MCQ;
