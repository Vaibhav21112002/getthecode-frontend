import React, { useEffect, useContext } from "react";
import { AdminNavbar, AdminTopBar } from "../../components";
import Modal from "react-awesome-modal";
import { AiOutlineClose, AiFillDelete, AiFillEdit } from "react-icons/ai";
import { CgMoreR } from "react-icons/cg";
import "../../assets/CSS/index.css";
import CodeContext from "../../context/CodeContext";
import swal from "sweetalert";
import FileBase64 from "react-file-base64";
import Loader from "../../assets/Images/loader.gif";
import { topics } from "../../assets/Constants";
import { useNavigate } from "react-router-dom";

const AdminMCQ = () => {
	const navigate = useNavigate();
	const {
		mcqs,
		getMcqs,
		addMcq,
		editMcq,
		deleteMcq,
		addUploadImage,
		loading,
		setLogin,
	} = useContext(CodeContext);
	const [editData, setEditData] = React.useState({});
	const [uploadOpen, setUploadOpen] = React.useState(false);
	const [detailOpen, setDetailOpen] = React.useState(false);
	const [editOpen, setEditOpen] = React.useState(false);
	const [uploadData, setUploadData] = React.useState({
		question: "",
		options: [
			{
				text: "",
				image: "",
			},
		],
		answer: 0,
		topicTag: "",
	});
	const TableComponent = ({ item, index }) => {
		return (
			<tr className="bg-white dark:bg-gray-800 text-[0.76rem]">
				<th className="py-4 px-6 font-medium dark:text-white text-gray-900 whitespace-nowrap">
					{index + 1}
				</th>
				<th className="py-4 px-6 font-medium dark:text-white text-gray-900	 whitespace-nowrap">
					{item.question.length > 50 ? (
						<p>{item.question.slice(0, 50)}...</p>
					) : (
						<p>{item.question}</p>
					)}
				</th>
				<th className="py-4 px-6 font-bold text-xl dark:text-white text-gray-900 whitespace-nowrap">
					<CgMoreR
						className="cursor-pointer"
						onClick={() => {
							setDetailOpen(true);
							setEditData(item);
						}}
					/>
				</th>
				{/* Edit Icon */}
				<th
					className="py-4 px-6 font-bold text-xl dark:text-white text-gray-900 whitespace-nowrap"
					onClick={() => {
						setEditOpen(true);
						setEditData(item);
						console.log(item);
					}}
				>
					<AiFillEdit className="cursor-pointer" />
				</th>

				<th
					className="py-4 px-6 font-bold text-xl dark:text-white text-gray-900 whitespace-nowrap"
					onClick={() => {
						swal({
							title: "Are you sure?",
							text: "Once deleted, you will not be able to recover this question!",
							icon: "warning",
							buttons: true,
							dangerMode: true,
						}).then((willDelete) => {
							if (willDelete) {
								swal("Poof! Your question has been deleted!", {
									icon: "success",
								});
								deleteMcq(item._id);
							} else {
								swal("Your question is safe!");
							}
						});
					}}
				>
					<AiFillDelete className="cursor-pointer" />
				</th>
			</tr>
		);
	};
	const divStyle = `flex w-full flex-col sm:px-12 px-4 gap-2 text-[#202128] py-2`;
	const labelStyle = ``;
	const inputStyle = `w-full border rounded-md p-2`;
	useEffect(() => {
		getMcqs();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
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
	const handleUpload = async () => {
		setUploadData({
			...uploadData,
			answer: parseInt(uploadData.answer),
		});
		console.log(uploadData);
		if (
			uploadData.question === "" ||
			uploadData.options[0].text === "" ||
			uploadData.answer == 0 ||
			uploadData.topicTag == ""
		) {
			swal("Please fill all the fields!");
			return;
		}

		for (let i = 0; i < uploadData.options.length; i++) {
			if (
				uploadData.options[i].text === "" &&
				uploadData.options[i].image === ""
			) {
				swal(
					"Please Either fill all the options or remove the empty options!",
				);
				return;
			}
		}

		if (uploadData.answer > uploadData.options.length) {
			swal("Please select a valid answer!");
			return;
		}

		for (let i = 0; i < uploadData.options.length; i++) {
			if (
				uploadData.options[i].image &&
				uploadData.options[i].image !== ""
			) {
				const cloudUrl = await addUploadImage(
					uploadData.options[i].image,
				);
				uploadData.options[i].image = cloudUrl;
			}
			uploadData.options[i].no = i + 1;
		}

		await addMcq(uploadData);
		swal({
			title: "MCQ Uploaded Successfully!",
			icon: "success",
		});

		setUploadData({
			question: "",
			options: [
				{
					text: "",
					image: "",
				},
			],
			answer: 0,
			topicTag: "",
		});

		setUploadOpen(false);
	};

	const handleEdit = async () => {
		if (
			editData.question === "" ||
			editData.options[0].text === "" ||
			editData.answer === 0
		) {
			swal("Please fill all the fields!");
			return;
		}

		for (let i = 0; i < editData.options.length; i++) {
			if (
				editData.options[i].text == "" &&
				(!editData.options[i].image || editData.options[i].image === "")
			) {
				swal(
					"Please Either fill all the options or remove the empty options!",
				);
				return;
			}
		}

		if (editData.answer > editData.options.length) {
			swal("Please select a valid answer!");
			return;
		}

		for (let i = 0; i < editData.options.length; i++) {
			if (editData.options[i].image && editData.options[i].image !== "") {
				const cloudUrl = await addUploadImage(
					editData.options[i].image,
				);
				editData.options[i].image = cloudUrl;
			}
			editData.options[i].no = i + 1;
		}

		await editMcq(editData._id, editData);
		swal({
			title: "MCQ Edited Successfully!",
			icon: "success",
		});

		setEditData({});

		setEditOpen(false);
	};

	const handleClose = () => {
		swal({
			title: "Do you want to discard your changes?",
			icon: "warning",
			buttons: true,
		}).then((res) => {
			if (res) {
				setUploadData({
					question: "",
					options: [
						{
							text: "",
							image: "",
						},
					],
					answer: 0,
					topicTag: "",
				});
				setUploadOpen(false);
			}
		});
	};

	const handleClose2 = () => {
		swal({
			title: "Do you want to discard your changes?",
			icon: "warning",
			buttons: true,
		}).then((res) => {
			if (res) {
				setEditData({});
				setEditOpen(false);
			}
		});
	};
	return (
		<div className={`w-full flex bg-[#222629]`}>
			<div className="w-2/12">
				<AdminNavbar />
			</div>
			<div className="w-10/12">
				<AdminTopBar />
				<div className="flex w-full ">
					<div className="flex flex-col gap-3 w-full ">
						<h1
							className={`text-center text-[#BDA9A9] text-xl font-bold mt-5`}
						>
							MCQs
						</h1>
						<div className="flex flex-col ">
							<div className="flex w-full items-center justify-between mt-8 px-[3rem]">
								<h1 className="text-left text-[white] text-base font-normal px-4">
									Your MCQs Here
								</h1>
								<button
									className="text-sm bg-[#E97500] px-4 py-2 rounded-xl text-white border-[#E97500] hover:shadow-2xl"
									onClick={() => setUploadOpen(true)}
								>
									Upload{" "}
								</button>
							</div>

							{mcqs && (
								<div className="py-8 w-full flex justify-center items-center text-[10px]">
									<div className="w-[90%]">
										<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
											<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
												<thead
													className={`text-xs text-white uppercase bg-[#E97500]`}
												>
													<tr>
														<th
															scope="col"
															className="py-3 px-6"
														>
															SNo.
														</th>
														<th
															scope="col"
															className="py-3 px-6"
														>
															Question
														</th>
														<th
															scope="col"
															className="py-3 px-6"
														>
															See More
														</th>
														<th
															scope="col"
															className="py-3 px-6"
														>
															Edit
														</th>
														<th
															scope="col"
															className="py-3 px-6"
														>
															Delete
														</th>
													</tr>
												</thead>
												{mcqs.length > 0 && (
													<tbody>
														{mcqs.map(
															(item, index) => (
																<TableComponent
																	item={item}
																	index={
																		index
																	}
																/>
															),
														)}
													</tbody>
												)}
											</table>
										</div>
									</div>
								</div>
							)}
							{/* Upload Modal */}
							<Modal
								visible={uploadOpen}
								onClickAway={handleClose}
								title="Solution"
								width="90%"
								height="90%"
							>
								<div className="h-[100%] overflow-auto modals text-[0.76rem]">
									<div className="flex w-full justify-end px-4 py-4">
										<AiOutlineClose
											className="text-black hover:font-bold text-[20px] cursor-pointer"
											onClick={handleClose}
										/>
									</div>
									<h1 className="text-center text-2xl py-4 text-[#202128]">
										{loading
											? "Uplading...."
											: "Upload a MCQ"}
									</h1>
									<div className="w-full flex flex-col gap-4 justify-center items-center">
										{!loading ? (
											<div className="w-full flex justify-center items-center flex-col py-4">
												<div className={divStyle}>
													<label
														className={labelStyle}
													>
														Question
													</label>
													<input
														type="text"
														className={inputStyle}
														value={
															uploadData.question
														}
														placeholder="Question"
														onChange={(e) =>
															setUploadData({
																...uploadData,
																question:
																	e.target
																		.value,
															})
														}
													/>
												</div>
												<div className={divStyle}>
													<label
														className={labelStyle}
													>
														Options
													</label>
													{/* Input Options dynmaically in a loop here with a button to add more options 
												and a button to remove options and a button to add more options and a button to remove options  */}

													{uploadData.options.map(
														(item, index) => (
															<div
																className="w-full flex justify-center items-center "
																key={index}
															>
																{/* Input both image and text from the use and image from filebase 64 */}
																<div className="w-full p-4 border rounded-md flex flex-col gap-2">
																	<input
																		type="text"
																		className="w-9/12 border rounded-md p-2"
																		value={
																			item.text
																		}
																		placeholder={`Option ${
																			index +
																			1
																		}`}
																		onChange={(
																			e,
																		) => {
																			let temp =
																				uploadData.options;
																			temp[
																				index
																			].text =
																				e.target.value;
																			setUploadData(
																				{
																					...uploadData,
																					options:
																						temp,
																				},
																			);
																		}}
																	/>

																	<FileBase64
																		multiple={
																			false
																		}
																		onDone={(
																			file,
																		) => {
																			let temp =
																				uploadData.options;
																			temp[
																				index
																			].image =
																				file.base64;
																			setUploadData(
																				{
																					...uploadData,
																					options:
																						temp,
																				},
																			);
																		}}
																	/>

																	{/* Show Image if There */}
																	{item.image && (
																		<img
																			src={
																				item.image
																			}
																			alt="option"
																			className="w-[100px] h-[100px] object-contain"
																		/>
																	)}
																</div>
																<div className="w-3/12 flex justify-center items-center gap-2">
																	{uploadData
																		.options
																		.length >
																		1 && (
																		<button
																			className="w-[100px] h-[40px] bg-[#1E1E1E] text-white rounded-md"
																			onClick={() => {
																				let temp =
																					uploadData.options;
																				temp.splice(
																					index,
																					1,
																				);
																				setUploadData(
																					{
																						...uploadData,
																						options:
																							temp,
																					},
																				);
																			}}
																		>
																			Remove
																		</button>
																	)}
																	{index ==
																		uploadData
																			.options
																			.length -
																			1 && (
																		<button
																			className="w-[100px] h-[40px] bg-[#1E1E1E] text-white rounded-md"
																			onClick={() => {
																				let temp =
																					uploadData.options;
																				temp.push(
																					{
																						text: "",
																						image: "",
																					},
																				);
																				setUploadData(
																					{
																						...uploadData,
																						options:
																							temp,
																					},
																				);
																			}}
																		>
																			Add
																		</button>
																	)}
																</div>
															</div>
														),
													)}
												</div>
												<div className={divStyle}>
													<label
														className={labelStyle}
													>
														Correct Answer
													</label>
													<select
														className={inputStyle}
														value={
															uploadData.answer
														}
														onChange={(e) =>
															setUploadData({
																...uploadData,
																answer: e.target
																	.value,
															})
														}
													>
														<option value="">
															Select
														</option>
														{uploadData.options.map(
															(item, index) => (
																<option
																	value={
																		index +
																		1
																	}
																	key={index}
																>
																	Option{" "}
																	{index + 1}
																</option>
															),
														)}
													</select>
												</div>
												<div className={divStyle}>
													<label
														className={labelStyle}
													>
														Topic Tag
													</label>
													<select
														className={inputStyle}
														value={
															uploadData.topicTag
														}
														onChange={(e) =>
															setUploadData({
																...uploadData,
																topicTag:
																	e.target
																		.value,
															})
														}
													>
														<option value="">
															Select
														</option>
														{topics.map(
															(item, index) => (
																<option
																	value={
																		item.title
																	}
																	key={index}
																>
																	{item.title}
																</option>
															),
														)}
													</select>
												</div>

												{/* Submit Question */}
												<button
													className="min-w-[100px] h-[40px] bg-[#1E1E1E] text-white rounded-md px-8"
													onClick={handleUpload}
												>
													Upload Question
												</button>
											</div>
										) : (
											<div className="w-full flex justify-center items-center flex-col py-4">
												<div>
													<img
														src={Loader}
														alt="loader"
														className="w-[20rem] h-[20rem] object-contain"
													/>
												</div>
											</div>
										)}
									</div>
								</div>
							</Modal>
							{/* Detail Modal */}
							{editData.question && (
								<Modal
									visible={detailOpen}
									onClickAway={() => setDetailOpen(false)}
									title="Solution"
									width="90%"
									height="90%"
								>
									<div>
										<div className="h-[100%] overflow-auto modals text-[0.76rem]">
											<div className="flex w-full justify-end px-4 py-4">
												<AiOutlineClose
													className="text-black hover:font-bold text-[20px] cursor-pointer"
													onClick={() =>
														setDetailOpen(false)
													}
												/>
											</div>
											<div className="px-8 w-full flex flex-col gap-2  text-[0.9rem]">
												<span
													className={`text-[#E97500] font-bold`}
												>
													Question
												</span>{" "}
												<span
													className={`text-[#202128] font-bold`}
												>
													{editData.question}
												</span>
											</div>

											<div className="px-8 w-full flex flex-col gap-2 mt-8">
												<span
													className={`text-[#E97500] font-bold text-[0.9rem]`}
												>
													Options
												</span>{" "}
												{editData.options &&
													editData.options.map(
														(item, index) => (
															<div>
																<div
																	className={`flex gap-2 items-center text-[0.9rem]`}
																>
																	<span
																		className={`text-[#202128] font-bold text-[0.9rem]`}
																	>
																		{
																			item.no
																		}{" "}
																		{"."}
																	</span>
																	<span
																		className={`text-[#202128] font-bold text-[0.9rem]`}
																	>
																		{
																			item.text
																		}
																	</span>
																	{editData.answer ===
																		index +
																			1 && (
																		<span
																			className={`text-[#E97500] font-bold`}
																		>
																			Answer
																		</span>
																	)}
																</div>
																{item.image &&
																	item.image !==
																		"" && (
																		<div className="mt-2">
																			<img
																				src={
																					item.image
																				}
																				alt="option"
																				className="w-[100px] h-[100px] object-contain"
																			/>
																		</div>
																	)}
															</div>
														),
													)}
											</div>

											{editData.topicTag &&
												editData.topicTag != "" && (
													<div className="px-8 w-full flex flex-col gap-2 mt-8">
														<span
															className={`text-[#E97500] font-bold text-[0.9rem]`}
														>
															#{" "}
															{editData.topicTag}
														</span>
													</div>
												)}
										</div>
									</div>
								</Modal>
							)}
							{/* Edit Modal */}
							{editData.question && (
								<Modal
									visible={editOpen}
									onClickAway={handleClose2}
									title="Solution"
									width="90%"
									height="90%"
								>
									<div className="h-[100%] overflow-auto modals text-[0.76rem]">
										<div className="flex w-full justify-end px-4 py-4">
											<AiOutlineClose
												className="text-black hover:font-bold text-[20px] cursor-pointer"
												onClick={handleClose2}
											/>
										</div>
										<h1 className="text-center text-2xl py-4 text-[#202128]">
											Edit the Problem
										</h1>
										<div className="w-full flex justify-center items-center flex-col py-4">
											<div className={divStyle}>
												<label className={labelStyle}>
													Question
												</label>
												<input
													type="text"
													className={inputStyle}
													value={editData.question}
													placeholder="Question"
													onChange={(e) =>
														setEditData({
															...editData,
															question:
																e.target.value,
														})
													}
												/>
											</div>
											<div className={divStyle}>
												<label className={labelStyle}>
													Options
												</label>
												{/* Input Options dynmaically in a loop here with a button to add more options 
												and a button to remove options and a button to add more options and a button to remove options  */}

												{editData.options.map(
													(item, index) => (
														<div
															className="w-full flex justify-center items-center "
															key={index}
														>
															{/* Input both image and text from the use and image from filebase 64 */}
															<div className="w-full p-4 border rounded-md flex flex-col gap-2">
																<input
																	type="text"
																	className="w-9/12 border rounded-md p-2"
																	value={
																		item.text
																	}
																	placeholder={`Option ${
																		index +
																		1
																	}`}
																	onChange={(
																		e,
																	) => {
																		let temp =
																			editData.options;
																		temp[
																			index
																		].text =
																			e.target.value;
																		setEditData(
																			{
																				...editData,
																				options:
																					temp,
																			},
																		);
																	}}
																/>
																<div className="border rounded-md p-2">
																	<h1 className="my-2">
																		Change /
																		Update
																		Image -{" "}
																	</h1>
																	<FileBase64
																		multiple={
																			false
																		}
																		onDone={(
																			file,
																		) => {
																			let temp =
																				editData.options;
																			temp[
																				index
																			].image =
																				file.base64;
																			setEditData(
																				{
																					...editData,
																					options:
																						temp,
																				},
																			);
																		}}
																	/>
																</div>

																{/* Show Image if There */}
																{item.image && (
																	<img
																		src={
																			item.image
																		}
																		alt="option"
																		className="w-[100px] h-[100px] object-contain"
																	/>
																)}
															</div>
															<div className="w-3/12 flex justify-center items-center gap-2">
																{editData
																	.options
																	.length >
																	1 && (
																	<button
																		className="w-[100px] h-[40px] bg-[#1E1E1E] text-white rounded-md"
																		onClick={() => {
																			let temp =
																				editData.options;
																			temp.splice(
																				index,
																				1,
																			);
																			setEditData(
																				{
																					...editData,
																					options:
																						temp,
																				},
																			);
																		}}
																	>
																		Remove
																	</button>
																)}
																{index ==
																	editData
																		.options
																		.length -
																		1 && (
																	<button
																		className="w-[100px] h-[40px] bg-[#1E1E1E] text-white rounded-md"
																		onClick={() => {
																			let temp =
																				editData.options;
																			temp.push(
																				{
																					text: "",
																					image: "",
																				},
																			);
																			setEditData(
																				{
																					...editData,
																					options:
																						temp,
																				},
																			);
																		}}
																	>
																		Add
																	</button>
																)}
															</div>
														</div>
													),
												)}
											</div>
											<div className={divStyle}>
												<label className={labelStyle}>
													Correct Answer
												</label>
												<select
													className={inputStyle}
													value={editData.answer}
													onChange={(e) =>
														setEditData({
															...editData,
															answer: e.target
																.value,
														})
													}
												>
													<option value="">
														Select
													</option>
													{editData.options.map(
														(item, index) => (
															<option
																value={
																	index + 1
																}
																key={index}
															>
																Option{" "}
																{index + 1}
															</option>
														),
													)}
												</select>
											</div>
											<div className={divStyle}>
												<label className={labelStyle}>
													{" "}
													Topic Tag{" "}
												</label>
												<select
													className={inputStyle}
													value={editData.topicTag}
													onChange={(e) =>
														setEditData({
															...editData,
															topicTag:
																e.target.value,
														})
													}
												>
													<option value="">
														{" "}
														Select{" "}
													</option>
													{topics.map((item) => (
														<option
															value={item.title}
															key={item.title}
														>
															{" "}
															{item.title}{" "}
														</option>
													))}
												</select>
											</div>

											{/* Submit Question */}
											<button
												className="min-w-[100px] h-[40px] bg-[#1E1E1E] text-white rounded-md px-8"
												onClick={handleEdit}
											>
												{" "}
												Save Changes{" "}
											</button>
										</div>
									</div>
								</Modal>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminMCQ;
