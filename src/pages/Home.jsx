import React from "react";
import { Navbar, Footer } from "../components";
import Hero from "../assets/Images/hero.svg";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const Tabs = ["Arrays", "Linked Lists", "Queues", "Stacks"];
	return (
		<div className="bg-[#222629] min-h-[100vh] w-full">
			<Navbar />
			<div className="min-h-[100vh] w-full pt-12">
				<div className="px-8 flex gap-4 items-center">
					<div className="w-[2px] h-[2rem] bg-[#FF9424]"></div>
					<h1 className="text-[#FF9424] font-bold">Code - today</h1>
				</div>
				<div className="w-full h-full flex items-center py-12 mt-4">
					<div className="w-1/2 p-4 flex justify-center items-center">
						<img
							src={Hero}
							alt="home"
							className="w-[80%] h-[80%]"
						/>
					</div>
					<div className="w-1/2 p-4 flex flex-col gap-4 justify-center items-center">
						<div className="flex">
							<div className="bg-[#D4D4D4] w-[5rem] h-[2.5rem] rounded-l-full flex justify-center items-center">
								<BiSearchAlt className="text-[#2D4763] text-2xl m-auto" />
							</div>
							<div>
								<input
									type="text"
									placeholder="Topic you want to learn today"
									className="w-[20rem] h-[2.5rem] px-4 text-[#2D4763] bg-[#D4D4D4] focus:outline-none"
								></input>
							</div>
							<div className="bg-[#FF9424] w-[5rem] h-[2.5rem] rounded-r-full flex justify-center items-center">
								Search
							</div>
						</div>
						<div className="flex flex-col gap-4">
							<div className="flex flex-wrap gap-4">
								{Tabs.slice(0, 2).map((item, index) => {
									return (
										<div
											key={index}
											className="bg-[#263A42] px-8 py-2 rounded-full"
										>
											<h1 className="text-white font-bold text-xl">
												{item}
											</h1>
										</div>
									);
								})}
							</div>
							<div className="flex flex-wrap gap-4">
								{Tabs.slice(2, 4).map((item, index) => {
									return (
										<div
											key={index}
											className="bg-[#263A42] px-8 py-2 rounded-full"
										>
											<h1 className="text-white font-bold text-xl">
												{item}
											</h1>
										</div>
									);
								})}
							</div>
						</div>
						<div className="flex gap-8 text-[16px] mt-8">
							<button
								className="flex gap-2 items-center"
								onClick={() => navigate("/blogs")}
							>
								<div className="w-[2px] h-[2rem] bg-[#FF9424]"></div>
								<h1 className="text-[#FF9424] font-bold">
									Read Blogs
								</h1>
							</button>
							<button
								className="flex gap-2 items-center"
								onClick={() => navigate("/mcqs")}
							>
								<div className="w-[2px] h-[2rem] bg-[#FF9424]"></div>
								<h1 className="text-[#FF9424] font-bold">
									Practice MCQs
								</h1>
							</button>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
