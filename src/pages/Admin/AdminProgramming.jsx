import React from "react";
import { AdminNavbar } from "../../components";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import Modal from "react-awesome-modal";
import Editor from "@monaco-editor/react";
import { AiOutlineClose } from "react-icons/ai";
import "../../assets/CSS/index.css";

const AdminProgramming = () => {
    const [uploadOpen, setUploadOpen] = React.useState(false);
    const [detailOpen, setDetailOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [solutionOpen, setSolutionOpen] = React.useState(false);
    const TableComponent = () => {
        return (
            <tr className="bg-white dark:bg-gray-800">
                <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:text-blue-600 dark:hover:text-blue-500 cursor-pointer"
                    onClick={() => setDetailOpen(true)}
                >
                    Two Sum
                </th>
                <td className="py-4 px-6">
                    <BsFileEarmarkSpreadsheet
                        className="text-2xl cursor-pointer hover:text-blue-600 dark:hover:text-blue-500
                        
                    "
                        onClick={() => setSolutionOpen(true)}
                    />
                </td>
                <td className="py-4 px-6 text-[#008000]">Easy</td>
                <td className="py-4 px-6">10</td>
                <td className="py-4 px-6 text-right">
                    <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => setEditOpen(true)}
                    >
                        Edit
                    </button>
                </td>
            </tr>
        );
    };
    return (
        <div className={`w-full bg-[#202128]`}>
            <div className={`w-full h-[4rem] bg-[#202128]`}></div>
            <div className="w-full h-[0.5px] bg-[#33343B]"></div>
            <div className="flex w-full ">
                <div className="w-2/12">
                    <AdminNavbar />
                </div>
                <div className="flex flex-col gap-3 w-10/12">
                    <h1
                        className={`text-center text-[#BDA9A9] text-2xl font-bold mt-5`}
                    >
                        Programming
                    </h1>
                    <div className="flex flex-col ">
                        <div className="flex w-full items-center mt-8">
                            <h1
                                className={`
                            text-left text-[#BDA9A9] text-lg font-normal px-4
                        `}
                            >
                                Your Programming Questions
                            </h1>
                            <button
                                className="bg-[#3A355C] px-4 py-2 rounded-xl text-white border-[#3A355C] hover:shadow-2xl"
                                onClick={() => setUploadOpen(true)}
                            >
                                Upload{" "}
                            </button>
                        </div>
                        <Modal
                            visible={solutionOpen}
                            onClickAway={() => setSolutionOpen(false)}
                            title="Solution"
                            width="90%"
                            height="90%"
                        >
                            <div className="h-[100%] overflow-auto modals">
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
                                    <div className="w-full flex justify-center items-center flex-col py-4">
                                        <div className="w-[90%] h-[30px] bg-[#1E1E1E] rounded-t-2xl"></div>
                                        <Editor
                                            height="60vh"
                                            width={`90%`}
                                            theme="vs-dark"
                                            defaultLanguage="java"
                                            defaultValue={`function add(a, b) {\n  return a + b;\n}`}
                                        />
                                        <div className="w-[90%] h-[30px] bg-[#1E1E1E] rounded-b-2xl mt-[-4px]"></div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                            visible={uploadOpen}
                            onClickAway={() => setUploadOpen(false)}
                            title="Solution"
                            width="90%"
                            height="90%"
                        >
                            <div className="h-[100%] overflow-auto modals">
                                <div className="flex w-full justify-end px-4 py-4">
                                    <AiOutlineClose
                                        className="text-black hover:font-bold text-[20px] cursor-pointer"
                                        onClick={() => setUploadOpen(false)}
                                    />
                                </div>
                            </div>
                        </Modal>
                        <Modal
                            visible={detailOpen}
                            onClickAway={() => setDetailOpen(false)}
                            title="Solution"
                            width="90%"
                            height="90%"
                        >
                            <div>
                                <div className="h-[100%] overflow-auto modals">
                                    <div className="flex w-full justify-end px-4 py-4">
                                        <AiOutlineClose
                                            className="text-black hover:font-bold text-[20px] cursor-pointer"
                                            onClick={() => setDetailOpen(false)}
                                        />
                                    </div>
                                    <div className="px-8 w-full flex flex-col gap-2">
                                        <h1>
                                            <span className="font-bold">
                                                Title :{" "}
                                            </span>
                                            Two Sum
                                        </h1>
                                        <h1>
                                            <span className="font-bold">
                                                Difficulty :{" "}
                                            </span>
                                            Easy
                                        </h1>
                                        <h1>
                                            <span className="font-bold">
                                                Tags :{" "}
                                            </span>{" "}
                                            Two Pointer, Sorting
                                        </h1>
                                        <div className="py-4">
                                            <h1 className="font-bold">
                                                Problem Statement
                                            </h1>
                                            <h1>
                                                Given an array of integers nums
                                                and an integer target, return
                                                indices of the two numbers such
                                                that they add up to target.{" "}
                                                <br />
                                                You may assume that each input
                                                would have exactly one solution,
                                                and you may not use the same
                                                element twice. <br />
                                                You can return the answer in any
                                                order.
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                            visible={editOpen}
                            onClickAway={() => setEditOpen(false)}
                            title="Solution"
                            width="90%"
                            height="90%"
                        >
                            <div>
                                <div className="h-[100%] overflow-auto modals">
                                    <div className="flex w-full justify-end px-4 py-4">
                                        <AiOutlineClose
                                            className="text-black hover:font-bold text-[20px] cursor-pointer"
                                            onClick={() => setEditOpen(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        <div className="py-8 w-full flex justify-center items-center">
                            <div className="w-[90%]">
                                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead
                                            className={`text-xs text-white uppercase bg-[#3A355C]`}
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
                                                >
                                                    Solution
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-3 px-6"
                                                >
                                                    Difficutly
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-3 px-6"
                                                >
                                                    Score
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="py-3 px-6"
                                                ></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <TableComponent />
                                            <TableComponent />
                                            <TableComponent />
                                            <TableComponent />
                                            <TableComponent />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProgramming;
