import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../components";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../assets/CSS/index.css";
import CodeContext from "../context/CodeContext";
import Void from "../assets/Images/Void.svg";
import Modal from "react-awesome-modal";
import Editor from "@monaco-editor/react";
import { AiOutlineClose } from "react-icons/ai";
import load from "../assets/Images/question_mark.png";
import { IoMdReturnRight } from "react-icons/io";

const Programming = () => {
  const { questions, getQuestions } = useContext(CodeContext);
  const [activeFilter, setActiveFilter] = useState("All Questions");
  const [language, setLanguage] = useState("java");
  console.log(language);

  const handleTopicFilter = (topic) => {
    if (activeFilter === topic) return;
    setActiveFilter(topic);
    if (topic === "All Questions") {
      setData(questions);
    } else {
      const newData = questions.filter((item) => item.topicTag.includes(topic));
      setData(newData);
    }
  };
  const navigate = useNavigate();
  // const [solutionOpen, setSolutionOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});
  const [solutionOpen, setSolutionOpen] = useState(false);
  let count = 0;
  useEffect(() => {
    if (activeFilter !== "All Questions") return;
    getQuestions();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (activeFilter !== "All Questions") return;
    setData(questions);
  }, [questions]);
  const topics = [
    { title: "All Questions" },
    { title: "Arrays" },
    { title: "Strings" },
    { title: "Linked List" },
    { title: "Stacks" },
    { title: "Queues" },
    { title: "Trees" },
    { title: "Graphs" },
    { title: "Sorting" },
    { title: "Searching" },
    { title: "Dynamic Programming" },
    { title: "Greedy" },
    { title: "Backtracking" },
    { title: "Bit Manipulation" },
    { title: "Math" },
    { title: "Miscellaneous" },
  ];
  const TopicCard = ({ title }) => {
    return (
      <div
        className="sm:w-[16rem] w-[10rem] text-[white]  flex justify-center items-center sm:px-6 px-4 py-2 rounded-lg shadow-xl cursor-pointer bg-[#E97500] border-[#E97500] hover:bg-[#202128] hover:text-[white]"
        onClick={() => handleTopicFilter(title)}
      >
        <h1 className="sm:text-sm text-xs text-center  hover:text-[white]">
          {title}
        </h1>
      </div>
    );
  };
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
      </tr>
    );
  };
  return (
    <div className="back">
      <Navbar />
      <div className="w-full sm:px-4 px-2 py-16  bg-[#222629] ">
        <div className="w-full flex flex-wrap justify-center items-center gap-4 ">
          {topics.map((topic, index) => {
            return <TopicCard key={index} title={topic.title} />;
          })}
        </div>
        <div className="py-8 w-full flex flex-col justify-center items-center mt-24">
          <h1
            className="
                            text-center text-[white] text-2xl font-bold px-4 py-12
                        "
          >
            Your Programming Questions
          </h1>
          <div className="w-[90%]">
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
                  </tr>
                </thead>

                {data.length > 0 ? (
                  <tbody>
                    {data.map((item, index) => {
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
                <img src={Void} alt="Void" className="w-[20rem] h-[20rem]" />
                <h1 className="text-2xl font-bold text-[#BDA9A9]">
                  No Questions Found
                </h1>
              </div>
            )}
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
                <h1 className="text-center font-bold text-2xl">Solution</h1>{" "}
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
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
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
                      defaultValue={`${editData.solution[language]}`}
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
    </div>
  );
import { topics } from "../assets/Constants";

const Programming = () => {
	const { questions, getQuestions } = useContext(CodeContext);
	const [activeFilter, setActiveFilter] = useState("All Questions");

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
	const navigate = useNavigate();
	// const [solutionOpen, setSolutionOpen] = useState(false);
	const [data, setData] = useState([]);
	const [editData, setEditData] = useState({});
	const [solutionOpen, setSolutionOpen] = React.useState(false);
	useEffect(() => {
		if (activeFilter !== "All Questions") return;
		getQuestions();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (activeFilter !== "All Questions") return;
		setData(questions);
	}, [questions]);

	const TopicCard = ({ title }) => {
		return (
			<div
				className="sm:w-[16rem] w-[10rem] text-[white]  flex justify-center items-center sm:px-6 px-4 py-2 rounded-lg shadow-xl cursor-pointer bg-[#E97500] border-[#E97500] hover:bg-[#202128] hover:text-[white]"
				onClick={() => handleTopicFilter(title)}
			>
				<h1 className="sm:text-sm text-xs text-center  hover:text-[white]">
					{title}
				</h1>
			</div>
		);
	};
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
			</tr>
		);
	};
	return (
		<div className="back">
			<Navbar />
			<div className="w-full sm:px-4 px-2 py-16  bg-[#222629] ">
				<div className="w-full flex flex-wrap justify-center items-center gap-4 ">
					{topics.map((topic, index) => {
						return <TopicCard key={index} title={topic.title} />;
					})}
				</div>
				<div className="py-8 w-full flex flex-col justify-center items-center mt-24">
					<h1
						className="
                            text-center text-[white] text-2xl font-bold px-4 py-12
                        "
					>
						Your Programming Questions
					</h1>
					<div className="w-[90%]">
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
									</tr>
								</thead>

								{data.length > 0 ? (
									<tbody>
										{data.map((item, index) => {
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
								{editData.solution && (
									<div className="w-full flex justify-center items-center flex-col py-4">
										<div className="w-[90%] h-[30px] bg-[#1E1E1E] rounded-t-2xl"></div>
										<Editor
											height="60vh"
											width={`90%`}
											theme="vs-dark"
											defaultLanguage="java"
											defaultValue={editData.solution}
											onChange={(value, event) => {
												setEditData({
													...editData,
													solution: value,
												});
											}}
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
		</div>
	);
};

export default Programming;
