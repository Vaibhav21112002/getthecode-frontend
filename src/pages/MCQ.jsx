import React, { useState, useEffect, useContext, useRef } from "react";
import { Navbar } from "../components";
import "../assets/CSS/index.css";
import { useNavigate } from "react-router-dom";
import Parser from "html-react-parser";
import codeContext from "../context/CodeContext";

const MCQ = () => {
  const [data, setData] = useState([]);
  const { getMcqs, mcqs } = useContext(codeContext);

  useEffect(() => {
    getMcqs();
  }, []);

  useEffect(() => {
    setData(mcqs);
  }, [mcqs]);

  const [answersVisible, setAnswersVisible] = useState(
    new Array(mcqs.length).fill(false)
  );

  const toggleAnswerVisibility = (index) => {
    const newAnswersVisible = [...answersVisible];
    newAnswersVisible[index] = !newAnswersVisible[index];
    setAnswersVisible(newAnswersVisible);
  };

  return (
    <div className="back bg-[#222629]">
      <Navbar />
      <div className="w-full flex bg-[#222629] z-0">
        <div className="w-full flex flex-col py-8 text-[white] px-20">
          <div className=" flex flex-col">
            <h1 className="text-center text-[white] text-2xl font-bold px-4 ">
              MCQ's
            </h1>
          </div>

          <div className="flex flex-col w-6/12">
            {data.map((mcq, index) => {
              return (
                <div
                  className="text-white ml-10 rounded-[16px]flex"
                  key={index}
                >
                  <div className="flex flex-col w-full ml-6">
                    <div className=" text-white w-full mt-2 ">
                      <h1 className="text-xl">{`Q${index + 1} ${
                        mcq.question
                      }`}</h1>
                    </div>
                    <div className="mt-3 mb-3 flex flex-col">
                      {mcq.options.map((option, index) => (
                        <span className="text-sm mb-3 text-white" key={index}>
                          {`${option.no}. ${option.option}`}
                        </span>
                      ))}
                      {!answersVisible[index] ? (
                        <button
                          className="text-sm bg-white rounded-md text-center mb-6 w-2/12 inline-block text-black"
                          onClick={() => toggleAnswerVisibility(index)}
                        >
                          Show Answer
                        </button>
                      ) : (
                        <button
                          className="text-sm bg-white rounded-md text-center w-2/12 inline-block text-black"
                          onClick={() => toggleAnswerVisibility(index)}
                        >
                          Show Answer
                        </button>
                      )}
                      {answersVisible[index] && (
                        <div className="text-white mt-3">
                          {`Answer: ${mcq.answer}`}
                          {mcq.options.map((option, index) => {
                            if (option.no === mcq.answer) {
                              console.log(option);
                              return (
                                <div>{`Explanation: ${option.option}`}</div>
                              );
                            }
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQ;
