import React, { useState, useEffect, useContext } from "react";
import { Navbar, Accordian, Footer } from "../components";
import "../assets/CSS/index.css";
import { useParams } from "react-router-dom";
import CodeContext from "../context/CodeContext";
import { Media, Player } from "react-media-player";
import Parser from "html-react-parser";
import Editor from "@monaco-editor/react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import "../assets/CSS/index.css";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const { question, getQuestion, loading } = useContext(CodeContext);
  const { id } = useParams();
  const [sol, setSol] = useState(0);
  const [language, setLanguage] = useState(``);
  const navigate = useNavigate();
  const questionTab =
    "w-36 py-2  border rounded-lg text-white bg-[#E97500] border border-[#E97500] hover:bg-[#202128] hover:text-[white] text-sm";
  useEffect(() => {
    const usrToken = localStorage.getItem("token");
    const adminToken = localStorage.getItem("admin-token");

    if (
      (usrToken === undefined || usrToken === null) &&
      (adminToken === undefined || adminToken === null)
    ) {
      navigate("/");
      return;
    }
    getQuestion(id, usrToken || adminToken);
    // eslint-disable-next-line
  }, []);

  const testStyle = "bg-[#25272E] w-full rounded-xl text-[0.76rem] p-4 mt-2";
  const QuestionComponent = ({ question }) => {
    return (
      <div>
        {!loading ? (
          <div>
            <h1 className="text-4xl font-bold text-[white]  ">
              {question.title ? question.title : "Two Sum"}
            </h1>
            <br />
            <div className="markdown">
              <MarkdownEditor.Markdown
                source={question.description}
                className="text-white text-sm bg-[#222629]"
              />
            </div>
            <h1 className="font-bold mt-8 text-xl">Test Case</h1>
            <br />
            {question.testCases &&
              question.testCases.map((testCase, index) => (
                <>
                  <div>
                    <h1 className="text-base">Example {index + 1}</h1>
                    <div className={testStyle}>
                      <div className={testStyle}>
                        <h1 className="font-bold text-xl">Input </h1>
                        <h1 className="input">{testCase.input}</h1>
                      </div>
                      <div className={testStyle}>
                        <h1 className="font-bold text-xl">Output </h1>
                        <h1 className="output">{testCase.output}</h1>
                      </div>
                      <div className={`${testStyle} mt-4`}>
                        <h1 className="font-bold text-xl">Explaination</h1>
                        <h1>{Parser(testCase.explaination)}</h1>
                      </div>
                    </div>
                  </div>
                  <br />
                </>
              ))}

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
        ) : (
          <h1 className="text-center py-12 text-white text-2xl font-bold">
            Question Loading ...
          </h1>
        )}
      </div>
    );
  };
  const SolutionComponent = ({ question }) => {
    if (language == "")
      setLanguage(
        `${
          question.solution.java !== ""
            ? "java"
            : question.solution.cpp !== ""
            ? "cpp"
            : "python"
        }`
      );
    return (
      <div className="bg-[#25272E] w-full rounded-xl text-[0.76rem] p-4 mt-2">
        <div className="flex justify-between">
          <h1 className="font-bold text-lg">Solution</h1>
          <div className="relative w-full">
            {question.solution && (
              <select
                value={language}
                onChange={(e) => {
                  console.log(e.target.value);
                  console.log(question.solution);
                  setLanguage(e.target.value);
                }}
                className="block appearance-none w-[40%] float-right text-center justify-between border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline text-black"
              >
                {question.solution.java !== "" && (
                  <option value="java">Java</option>
                )}
                {question.solution.cpp !== "" && (
                  <option value="cpp">C++</option>
                )}
                {question.solution.python !== "" && (
                  <option value="python">Python</option>
                )}
              </select>
            )}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7l-5 5z" />
              </svg>
            </div>
          </div>
        </div>
        <br />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="bg-[#25272E] w-full rounded-xl text-[0.76rem] p-4 mt-2">
              {question.solution && (
                <div className="w-full flex justify-center items-center flex-col py-4">
                  <div className="w-[100%] h-[30px] bg-[#1E1E1E] rounded-t-2xl"></div>
                  <Editor
                    height="60vh"
                    width={`100%`}
                    theme="vs-dark"
                    defaultLanguage="java"
                    defaultValue={`${question.solution[language]}`}
                    value={`${question.solution[language]}`}
                    tabIndex={4}
                    options={{ readOnly: true }}
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
    <div className="back ">
      <Navbar question />
      <div className="w-full flex bg-[#222629]">
        <div className="w-9/12 flex flex-col py-8 text-[white] px-20">
          <div className="flex justify-start">
            <div className="bg-[#25272E] flex p-2 rounded-xl gap-2 my-8 ">
              <button className={questionTab} onClick={() => setSol(0)}>
                Question
              </button>
              <button className={questionTab} onClick={() => setSol(1)}>
                Solution
              </button>
              <button className={questionTab} onClick={() => setSol(2)}>
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
                <h1 className="font-bold text-lg">Video Solution</h1>

                <br />
                {question.videoLink ? (
                  <Media>
                    <div className="media w-full flex justify-center items-center">
                      <div className="media-player">
                        <Player src={question.videoLink} />
                      </div>
                    </div>
                  </Media>
                ) : (
                  <div className="w-full flex justify-center items-center flex-col py-4 text-2xl">
                    No Video Solution Available
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="min-h-[100vh] border-r"></div>
        <div className="w-3/12 flex flex-col gap-4 p-4 mt-20">
          <div style={{ position: "fixed", width: "25%" }}>
            <div
              className="bg-[#25272E] rounded-xl py-4 mb-5"
              style={{ width: "90%" }}
            >
              <h1 className="text-base font-bold text-center text-[white] h-10">
                Topic Tags
              </h1>
              <div className="flex flex-wrap py-2">
                {question.topicTag?.map((tag) => {
                  return (
                    <div className="flex items-center gap-2 p-2">
                      <div className="px-4 py-1 min-w-4 min-h-4 bg-[#E97500] border border-[#E97500] text-white rounded-lg">
                        <h1 className="text-[10px]">{tag}</h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="bg-[#25272E] rounded-xl py-4"
              style={{ width: "90%" }}
            >
              <h1 className="text-base font-bold text-center text-[white]">
                Company Tags
              </h1>
              <div className="flex flex-wrap py-2">
                {question.companyTag?.map((tag) => {
                  return (
                    <div className="flex items-center gap-2 p-2">
                      <div className="px-4 py-1 min-w-4 min-h-4 bg-[#E97500] border border-[#E97500] text-[white] rounded-lg">
                        <h1 className="text-[10px]">{tag}</h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Question;
