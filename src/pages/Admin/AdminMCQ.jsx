import React, { useEffect, useContext } from "react";
import { AdminNavbar, AdminTopBar } from "../../components";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import Modal from "react-awesome-modal";
import Editor from "@monaco-editor/react";
import { AiOutlineClose } from "react-icons/ai";
import "../../assets/CSS/index.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CodeContext from "../../context/CodeContext";
import swal from "sweetalert";
import Void from "../../assets/Images/Void.svg";
import { useNavigate } from "react-router-dom";
import data from "../../assets/data.json";
import codeContext from "../../context/CodeContext";
import { useState } from "react";

const AdminMcq = () => {
  const navigate = useNavigate();
  const { getMcqs, mcqs } = useContext(codeContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    getMcqs();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setData(mcqs);
    console.log(mcqs);
  }, [mcqs]);

  const TableComponent = ({ item }) => {
    console.log(item);
    return (
      <tr className="bg-white dark:bg-gray-800 text-[0.76rem]">
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:text-blue-600 dark:hover:text-blue-500 cursor-pointer"
          //redirect to new page
          onClick={() => {
            navigate(`/mcqs/${item._id}`);
          }}
        >
          {item.question ? item.question : "Two Sum"}
        </th>
        {item.options.map((option) => (
          <th
            scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:text-blue-600 dark:hover:text-blue-500 cursor-pointer"
            //redirect to new page
            onClick={() => {
            }}
          >
            {option.option}
          </th>
        ))}
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:text-blue-600 dark:hover:text-blue-500 cursor-pointer"
          //redirect to new page
          onClick={() => {
            navigate(`/mcqs/${item._id}`);
          }}
        >
          {item.answer ? item.answer : "Two Sum"}
        </th>

        <td className="py-4 px-6 text-right">
          <button
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onClick={() => navigate(`/admin/mcqs/${item._id}`)}
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
      <div className="w-10/12 bg-[#222629]">
        <AdminTopBar />
        <div className="flex w-full ">
          <div className="flex flex-col gap-3 w-full ">
            <h1 className={`text-center text-[#BDA9A9] text-xl font-bold mt-5`}>
              MCQ questions
            </h1>
            <div className="flex flex-col ">
              <div className="flex w-full items-center justify-between mt-8 px-[3rem]">
                <h1 className="text-left text-[white] text-base font-normal px-4">
                </h1>
                <button
                  className="text-sm bg-[#E97500] px-4 py-2 rounded-xl text-white border-[#E97500] hover:shadow-2xl"
                  onClick={() => navigate("/admin/createMcq")}
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
                          <th scope="col" className="py-3 px-6 ">
                            Question
                          </th>
                          <th scope="col" className="py-3 px-6 ">
                            Option 1
                          </th>
                          <th scope="col" className="py-3 px-6 ">
                            Option 2
                          </th>
                          <th scope="col" className="py-3 px-6 ">
                            Option 3
                          </th>
                          <th scope="col" className="py-3 px-6 ">
                            Option 4
                          </th>
                          <th scope="col" className="py-3 px-6 ">
                            Answer
                          </th>
                          <th scope="col" className="py-3 px-6"></th>
                        </tr>
                      </thead>
                      {data.length > 0 && (
                        <tbody>
                          {data.length &&
                            data.map((mcq, index) => {
                              return <TableComponent key={index} item={mcq} />;
                            })}
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

export default AdminMcq;
