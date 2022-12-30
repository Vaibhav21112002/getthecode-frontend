import React from "react";
import { Navbar } from "../components";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import "../assets/CSS/index.css";

const Programming = () => {
    const [detailOpen, setDetailOpen] = React.useState(false);
    const [solutionOpen, setSolutionOpen] = React.useState(false);
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
            <div className="sm:w-[18rem] w-[10rem]  flex justify-center items-center sm:px-8 px-4 py-2 bg-[#6B5DD3] rounded-lg shadow-xl">
                <h1 className="sm:text-base text-xs text-center">{title}</h1>
            </div>
        );
    };
    const TableComponent = () => {
        return (
            <tr className="bg-white border-b dark:bg-gray-800">
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
            </tr>
        );
    };
    return (
        <div className="back">
            <Navbar />
            <div className="w-full sm:px-4 px-2 py-16   ">
                <div className="w-full flex flex-wrap justify-center items-center gap-4 ">
                    {topics.map((topic, index) => {
                        return <TopicCard key={index} title={topic.title} />;
                    })}
                </div>
                <div className="py-8 w-full flex flex-col justify-center items-center mt-24">
                    <h1
                        className="
                            text-center text-[#BDA9A9] text-3xl font-bold px-4 py-12
                        "
                    >
                        Your Programming Questions
                    </h1>
                    <div className="w-[90%]">
                        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    className={`text-xs text-white uppercase bg-[#6B5DD3]`}
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
    );
};

export default Programming;
