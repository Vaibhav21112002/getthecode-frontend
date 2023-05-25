import React, { useState, useEffect, useContext } from "react";
import { Navbar, Footer} from "../components";
import "../assets/CSS/index.css";
import { useParams } from "react-router-dom";
import CodeContext from "../context/CodeContext";
import { Media, Player } from "react-media-player";
import Parser from "html-react-parser";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";

const SqlQuestion = () => {
  const { sql, getSql } = useContext(CodeContext);
  const { id } = useParams();
  const [sol, setSol] = useState(0);
  const navigate = useNavigate();
  const questionTab =
    "w-36 py-2  border rounded-lg text-white bg-[#E97500] border border-[#E97500] hover:bg-[#202128] hover:text-[white] text-sm";

  useEffect(() => {
    const usrToken = localStorage.getItem("token");
    const adminToken = localStorage.getItem("admin-token");

    if ((usrToken === undefined || usrToken === null)&&(adminToken === undefined || adminToken === null)) {
      navigate("/");
      return;
    }

    getSql(id,usrToken||adminToken);
    // eslint-disable-next-line
  }, []);

  const QuestionComponent = ({ sql }) => {
    if(sql?.title)
    return (
      <div>
        <h1 className="text-4xl font-bold text-[white]  ">
          {sql.title ? sql.title : "Two Sum"}
        </h1>
        <h1 className="py-4 text-justify text-white ">
          {sql.description
            ? Parser(sql.description)
            : "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."}
        </h1>
        <div className="w-full">
          <label htmlFor="title" className="text-white">
            Tables
          </label>
          <div className="flex flex-wrap  rounded-md">
            {sql.tables.map((table, tableIndex) => (
              <div key={tableIndex} className=" pb-3 pt-2 mr-5 min-w-[20%]">
                <table className="table-auto w-full">
                  <tbody>
                  <tr>
                    <td>{table.name}</td>
                  </tr>
                    {table.tableData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                          <td
                            key={colIndex}
                            className={` max-w-[${100 / table.numCols}%]`}
                          >
                            <input
                              type="text"
                              className={`text-black px-3  ${
                                rowIndex === 0
                                  ? "bg-white border-b-black  border-2 font-extrabold border-t-0 border-x-0"
                                  : rowIndex % 2 === 0
                                  ? "bg-[#d6efe1]"
                                  : "bg-white"
                              }`}
                              value={`${cell}`}
                              disabled={true}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  const SolutionComponent = ({ sql }) => {
    if(sql?.title)
    return (
      <div className="bg-[#25272E] w-full rounded-xl text-[0.76rem] p-4 mt-2">
        <div className="flex justify-between">
          <h1 className="font-bold text-lg">Solution</h1>
        </div>
        <br />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="bg-[#25272E] w-full rounded-xl text-[0.76rem] p-4 mt-2">
              {sql.solution && (
                <div className="w-full flex justify-center items-center flex-col py-4">
                  <div className="w-[100%] h-[30px] bg-[#1E1E1E] rounded-t-2xl"></div>
                  <Editor
                    height="60vh"
                    width={`100%`}
                    theme="vs-dark"
                    defaultLanguage="sql"
                    value={`${sql.solution}`}
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
              <QuestionComponent sql={sql} />
            ) : sol === 1 ? (
              <SolutionComponent sql={sql} />
            ) : (
              <div className="bg-[#25272E] w-full rounded-xl text-[0.76rem] p-4 mt-2">
                <h1 className="font-bold text-lg">Video Solution</h1>

                <br />
                {sql.videoLink ? (
                  <Media>
                    <div className="media mt-4 w-full flex justify-center items-center">
                      <div className="media-player">
                        <Player src={sql.viewLink} />
                      </div>
                    </div>
                  </Media>
                ) : (
                  <div className="my-4 mx-auto justify-center text-center">
                    No Video Solution for this question
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
              className="bg-[#25272E] rounded-xl py-4"
              style={{ width: "90%" }}
            >
              <h1 className="text-base font-bold text-center text-[white]">
                Company Tags
              </h1>
              <div className="flex flex-wrap py-2">
                {sql.companyTag?.map((tag) => {
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
      <Footer/>
    </div>
  );
};

export default SqlQuestion;
