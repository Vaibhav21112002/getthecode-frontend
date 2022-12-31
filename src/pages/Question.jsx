import React, { useState } from "react";
import { Navbar } from "../components";
import "../assets/CSS/index.css";

const Question = () => {
    const [sol, setSol] = useState(false);
    const TopicTags = [
        "Arrays",
        "Strings",
        "Linked List",
        "Stacks",
        "Queues",
        "Trees",
        "Graphs",
        "Sorting",
        "Searching",
        "Dynamic Programming",
        "Greedy",
        "Backtracking",
        "Bit Manipulation",
        "Math",
        "Miscellaneous",
    ];

    const CompanyTags = [
        "Amazon",
        "Apple",
        "Facebook",
        "Google",
        "Microsoft",
        "Oracle",
        "Uber",
        "Miscellaneous",
    ];
    return (
        <div className="back">
            <Navbar />
            <div className="w-full flex">
                <div className="w-9/12 flex justify-center py-8 text-[#BDA9A9]">
                    {sol ? (
                        <div className="w-[80%]">
                            <div className="flex px-24 justify-center">
                                <div className="w-full bg-[#25272E] flex p-2 rounded-xl gap-2 my-8">
                                    <button
                                        className="w-full py-4 bg-[#BDA9A9] border border-[#BDA9A9] rounded-xl text-white hover:text-[#BDA9A9] hover:bg-[#202128]"
                                        onClick={() => setSol(false)}
                                    >
                                        Question
                                    </button>
                                    <button
                                        className="w-full py-4 bg-[#BDA9A9] border border-[#BDA9A9] rounded-xl text-white hover:text-[#BDA9A9] hover:bg-[#202128]"
                                        onClick={() => setSol(true)}
                                    >
                                        Solution
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-[80%]">
                            <div className="flex px-24 justify-center">
                                <div className="w-full bg-[#25272E] flex p-2 rounded-xl gap-2 my-8">
                                    <button
                                        className="w-full py-4 bg-[#BDA9A9] border border-[#BDA9A9] rounded-xl text-white hover:text-[#BDA9A9] hover:bg-[#202128]"
                                        onClick={() => setSol(false)}
                                    >
                                        Question
                                    </button>
                                    <button
                                        className="w-full py-4 bg-[#BDA9A9] border border-[#BDA9A9] rounded-xl text-white hover:text-[#BDA9A9] hover:bg-[#202128]"
                                        onClick={() => setSol(true)}
                                    >
                                        Solution
                                    </button>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-[#BDA9A9] ">
                                Two Sum
                            </h1>
                            <h1 className="mt-12 text-xl font-bold text-[#BDA9A9] underline">
                                Problem Definition
                            </h1>
                            <h1 className="py-4 text-justify ">
                                Given an array of integers nums and an integer
                                target, return indices of the two numbers such
                                that they add up to target. <br />
                                You may assume that each input would have
                                exactly one solution, and you may not use the
                                same element twice. <br />
                                You can return the answer in any order.
                            </h1>
                            <h1 className="font-bold">Test Case</h1>
                            <br />
                            <h1>Input : nums = [3,2,4]</h1>
                            <h1>target = 6</h1>
                            <br />
                            <h1>Output : [1,2]</h1>
                        </div>
                    )}
                </div>
                <div className="min-h-[100vh] border-r"></div>
                <div className="w-3/12 flex flex-col gap-4 p-4 ">
                    <div className="bg-[#25272E] rounded-xl py-4">
                        <h1 className="text-lg font-bold text-center text-[#BDA9A9]">
                            Topic Tags
                        </h1>
                        <div className="flex flex-wrap py-4">
                            {TopicTags.map((tag) => {
                                return (
                                    <div className="flex items-center gap-2 p-2">
                                        <div className="px-4 py-2 min-w-4 min-h-4 bg-[#BDA9A9] text-[#FFF] rounded-full">
                                            <h1 className="text-[10px]">
                                                {tag}
                                            </h1>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="bg-[#25272E] rounded-xl py-4">
                        <h1 className="text-lg font-bold text-center text-[#BDA9A9]">
                            Company Tags
                        </h1>
                        <div className="flex flex-wrap py-4">
                            {CompanyTags.map((tag) => {
                                return (
                                    <div className="flex items-center gap-2 p-2">
                                        <div className="px-4 py-2 min-w-4 min-h-4 bg-[#BDA9A9] text-[#FFF] rounded-full">
                                            <h1 className="text-[10px]">
                                                {tag}
                                            </h1>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Question;
