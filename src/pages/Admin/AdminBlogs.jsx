import React, { useEffect, useContext } from "react";
import { AdminNavbar, AdminTopBar } from "../../components";
import "../../assets/CSS/index.css";
import { useNavigate } from "react-router-dom";
import codeContext from "../../context/CodeContext";
import { useState } from "react";

const AdminBlogs = () => {
	const navigate = useNavigate();
	const { getBlogs, blogs, setLogin } = useContext(codeContext);
	const [data, setData] = useState([]);

	useEffect(() => {
		getBlogs();
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		setData(blogs);
	}, [blogs]);

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

	const TableComponent = ({ item }) => {
		return (
			<tr className="bg-white dark:bg-gray-800 text-[0.76rem]">
				<th
					scope="row"
					className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:text-blue-600 dark:hover:text-blue-500 cursor-pointer"
					//redirect to new page
					onClick={() => {
						navigate(`/blogs/${item._id}`);
					}}
				>
					{item.title ? item.title : "Two Sum"}
				</th>

				<td className="py-4 px-6 text-right">
					<button
						className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
						onClick={() => navigate(`/admin/blogs/${item._id}`)}
					>
						Edit
					</button>
				</td>
			</tr>
		);
	};

	return (
		<div className={`w-full flex bg-[#222629]`}>
			<div className="w-2/12">
				<AdminNavbar />
			</div>
			<div className="w-10/12 flex flex-col justify-center items-center">
				<AdminTopBar />
				<div className="flex w-full">
					<div className="flex flex-col gap-3 w-full ">
						<h1
							className={`text-center text-[#BDA9A9] text-xl font-bold mt-5`}
						>
							Blogs
						</h1>
						<div className="flex flex-col ">
							<div className="flex w-full items-center justify-between mt-8 px-[3rem]">
								<h1 className="text-left text-[white] text-base font-normal px-6">
									Your Blogs
								</h1>
								<button
									className="text-sm bg-[#E97500] px-10 mr-5 py-2 rounded-xl text-white border-[#E97500] hover:shadow-2xl"
									onClick={() =>
										navigate("/admin/createBlog")
									}
								>
									Upload{" "}
								</button>
							</div>

							<div className="py-8 w-full flex justify-center items-center text-[10px]">
								<div className="w-[90%]">
									<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
										<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
											<thead
												className={`text-xs text-white uppercase bg-[#E97500] border-[#E97500]`}
											>
												<tr>
													<th
														scope="col"
														className="py-3 px-6"
													>
														Title
													</th>
													<th
														scope="col"
														className="py-3 px-6"
													></th>
												</tr>
											</thead>
											{data.length > 0 && (
												<tbody>
													{data.length &&
														data.map(
															(blog, index) => {
																return (
																	<TableComponent
																		key={
																			index
																		}
																		item={
																			blog
																		}
																	/>
																);
															},
														)}
												</tbody>
											)}
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminBlogs;
