import React, { useState, useEffect, useContext } from "react";
import { Navbar, Accordian } from "../components";
import "../assets/CSS/index.css";
import { useParams } from "react-router-dom";
import CodeContext from "../context/CodeContext";
import { Media, Player } from "react-media-player";
import Parser from "html-react-parser";
import Editor from "@monaco-editor/react";

const Question = () => {
    const { question, getQuestion } = useContext(CodeContext);
    const { id } = useParams();
    const [sol, setSol] = useState(0);
    const [data, setData] = useState({});
    const questionTab =
        "w-36 py-2 bg-[#6B5DD3] border border-[#6B5DD3] rounded-lg text-white hover:text-[#6B5DD3] hover:bg-[#202128] text-sm";
    useEffect(() => {
        getQuestion(id);
        setData(question);
        console.log(question, data);
        // eslint-disable-next-line
    }, []);
    const testStyle = "bg-[#25272E] w-full rounded-xl text-[0.76rem] p-4 mt-2";
    const QuestionComponent = ({ question }) => {
        return (
            <div>
                <h1 className="text-4xl font-bold text-[#BDA9A9]  ">
                    {question.title ? question.title : "Two Sum"}
                </h1>
                <h1 className="py-4 text-justify py-4">
                    {question.description
                        ? Parser(question.description)
                        : "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."}
                </h1>
                <h1 className="font-bold mt-8 text-lg">Test Case</h1>
                <br />
                {question.testCases && (
                    <div>
                        <h1>Example 1</h1>
                        <div className={testStyle}>
                            <h1 className="font-bold">Input : </h1>
                            <h1>{question.testCases.testCase1.input}</h1>
                        </div>
                        <div className={testStyle}>
                            <h1 className="font-bold">Output : </h1>
                            <h1>{question.testCases.testCase1.output}</h1>
                        </div>
                        <div className="mt-4">
                            <h1 className="font-bold">Explaination : </h1>
                            <h1>{Parser(question.testCases.testCase1.explaination)}</h1>
                        </div>
                    </div>
                )}
                <br />
                {question.testCases && (
                    <div>
                        <h1>Example 2</h1>
                        <div className={testStyle}>
                            <h1 className="font-bold">Input : </h1>
                            <h1>{question.testCases.testCase2.input}</h1>
                        </div>
                        <div className={testStyle}>
                            <h1 className="font-bold">Output : </h1>
                            <h1>{question.testCases.testCase2.output}</h1>
                        </div>
                        <div className="mt-4">
                            <h1 className="font-bold">Explaination : </h1>
                            <h1>{Parser(question.testCases.testCase2.explaination)}</h1>
                        </div>
                    </div>
                )}

                <br />
                {question.hints && (
                    <div>
                        <h1 className="font-bold text-lg">Hints</h1>
                        <br />
                        {question.hints.hint1 != "" && (
                            <div>
                                <Accordian
                                    title={"Hint 1"}
                                    description={question.hints.hint1}
                                />
                            </div>
                        )}
                        {question.hints.hint2 != "" && (
                            <div className="mt-2">
                                <Accordian
                                    title={"Hint 2"}
                                    description={question.hints.hint2}
                                />
                            </div>
                        )}
                        {question.hints.hint3 != "" && (
                            <div className="mt-2">
                                <Accordian
                                    title={"Hint 3"}
                                    description={question.hints.hint3}
                                />
                            </div>
                        )}
                        {question.hints.hint4 != "" && (
                            <div className="mt-2">
                                <Accordian
                                    title={"Hint 4"}
                                    description={question.hints.hint4}
                                />
                            </div>
                        )}
                        {question.hints.hint5 != "" && (
                            <div className="mt-2">
                                <Accordian
                                    title={"Hint 5"}
                                    description={question.hints.hint5}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };
    const SolutionComponent = ({ question }) => {
        return (
            <div className="bg-[#25272E] w-full rounded-xl text-[0.76rem] p-4 mt-2">
                <h1 className="font-bold text-lg">Solution</h1>
                <br />
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold">Java</h1>
                        <div className="bg-[#25272E] w-full rounded-xl text-[0.76rem] p-4 mt-2">
                            {/* <code>
                                {question.solution
                                    ? question.solution
                                    : "class Solution {" +
                                      "public:" +
                                      "vector<int> twoSum(vector<int>& nums, int target) {" +
                                      "vector<int> ans;" +
                                      "for(int i=0;i<nums.size();i++) {" +
                                      "for(int j=i+1;j<nums.size();j++) {" +
                                      "if(nums[i]+nums[j]==target) {" +
                                      "ans.push_back(i);" +
                                      "ans.push_back(j);" +
                                      "return ans;" +
                                      "}" +
                                      "}" +
                                      "}" +
                                      "return ans;" +
                                      "}" +
                                      "};"}
                            </code> */}
                            {question.solution && (
                                <div className="w-full flex justify-center items-center flex-col py-4">
                                    <div className="w-[100%] h-[30px] bg-[#1E1E1E] rounded-t-2xl"></div>
                                    <Editor
                                        height="60vh"
                                        width={`100%`}
                                        theme="vs-dark"
                                        defaultLanguage="java"
                                        defaultValue={question.solution}
                                        // onChange={(value, event) => {
                                        //     console.log(value);
                                        // }}
                                        tabIndex={4}
                                    />
                                    <div className="w-[100%] h-[30px] bg-[#1E1E1E] rounded-b-2xl mt-[-4px]"></div>
                                </div>
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
            <div className="w-full flex">
                <div className="w-9/12 flex flex-col py-8 text-[#BDA9A9] px-20">
                    <div className="flex justify-start">
                        <div className="bg-[#25272E] flex p-2 rounded-xl gap-2 my-8 ">
                            <button
                                className={questionTab}
                                onClick={() => setSol(0)}
                            >
                                Question
                            </button>
                            <button
                                className={questionTab}
                                onClick={() => setSol(1)}
                            >
                                Solution
                            </button>
                            <button
                                className={questionTab}
                                onClick={() => setSol(2)}
                            >
                                Video Solution
                            </button>
                        </div>
                    </div>
                    <div className="w-[100%]">
                        {sol === 0 ? (
                            <QuestionComponent question={question} />
                        ) : sol === 1 ? (
                            <SolutionComponent question={question} />
                        ) : (
                            <div className="bg-[#25272E] w-full rounded-xl text-[0.76rem] p-4 mt-2">
                                <h1 className="font-bold text-lg">
                                    Video Solution
                                </h1>

                                <br />
                                <Media>
                                    <div className="media w-full flex justify-center items-center">
                                        <div className="media-player">
                                            <Player
                                                src={
                                                    question.videoLink
                                                        ? question.videoLink
                                                        : "http://www.youtube.com/embed/h3YVKTxTOgU"
                                                }
                                            />
                                        </div>
                                    </div>
                                </Media>
                            </div>
                        )}
                    </div>
                </div>
                <div className="min-h-[100vh] border-r"></div>
                <div className="w-3/12 flex flex-col gap-4 p-4 mt-20">
                <div style={{position:'fixed'}}>

                    <div className="bg-[#25272E] rounded-xl py-4 mb-5" >
                        <h1 className="text-base font-bold text-center text-[#BDA9A9]">
                            Topic Tags
                        </h1>
                        <div className="flex flex-wrap py-2">
                            {question.topicTag?.map((tag) => {
                                return (
                                    <div className="flex items-center gap-2 p-2">
                                        <div className="px-4 py-1 min-w-4 min-h-4 bg-[#6B5DD3] text-[#FFF] rounded-lg">
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
                        <h1 className="text-base font-bold text-center text-[#BDA9A9]">
                            Company Tags
                        </h1>
                        <div className="flex flex-wrap py-2">
                            {question.companyTag?.map((tag) => {
                                return (
                                    <div className="flex items-center gap-2 p-2">
                                        <div className="px-4 py-1 min-w-4 min-h-4 bg-[#6B5DD3] text-[#FFF] rounded-lg">
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
        </div>
    );
};

export default Question;
