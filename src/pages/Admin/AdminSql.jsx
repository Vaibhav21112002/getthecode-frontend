import React, { useEffect, useContext } from "react";
import { AdminNavbar, AdminTopBar } from "../../components";
import "../../assets/CSS/index.css";
import { useNavigate } from "react-router-dom";
import codeContext from "../../context/CodeContext";
import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { CgMoreR } from "react-icons/cg";
import swal from "sweetalert";
import { Media, Player } from "react-media-player";
import Modal from "react-awesome-modal";
import Parser from "html-react-parser";
import Editor from "@monaco-editor/react";
const AdminSql = () => {
  const navigate = useNavigate();
  const { getSqls, sqls, setLogin, deleteSql } = useContext(codeContext);
  const [preview, setPreview] = useState(false);
  const [viewData, setViewData] = useState({});

  useEffect(() => {
    getSqls();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const d = localStorage.getItem("token");
    if (!d) {
      setLogin(false);
      navigate("/admin");
      return;
    }

    const date = new Date(parseInt(d));
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays > 1) {
      localStorage.removeItem("token");
      setLogin(false);
      navigate("/admin");
      return;
    }
    setLogin(true);
  }, []);

  const TableComponent = ({ item, index }) => {
    return (
      <tr className="text-[0.76rem]">
        <th className="py-4 px-6 font-medium  text-white whitespace-nowrap">
          {index + 1}
        </th>
        <th
          scope="row"
          className="py-4 px-6 font-medium text-white whitespace-nowrap dark:text-white hover:text-blue-600 dark:hover:text-blue-500 cursor-pointer"
          //redirect to new page
          onClick={() => {
            navigate(`/sql/${item._id}`);
          }}
        >
          {item.title ? item.title : "Two Sum"}
        </th>

        <th className="py-4 px-6 font-bold text-xl text-white whitespace-nowrap">
          <CgMoreR
            className="cursor-pointer"
            onClick={() => {
              setPreview(true);
              setViewData(item);
              console.log(viewData);
            }}
          />
        </th>
        {/* Edit Icon */}
        <th
          className="py-4 px-6 font-bold text-xl text-white whitespace-nowrap"
          onClick={() => {
            navigate(`/admin/sql/${item._id}`);
          }}
        >
          <AiFillEdit className="cursor-pointer" />
        </th>

        <th
          className="py-4 px-6 font-bold text-xl text-white whitespace-nowrap"
          onClick={() => {
            swal({
              title: "Are you sure?",
              text: "Once deleted, you will not be able to recover this question!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                swal("Poof! Your question has been deleted!", {
                  icon: "success",
                });
                deleteSql(item._id);
              } else {
                swal("Your question is safe!");
              }
            });
          }}
        >
          <AiFillDelete className="cursor-pointer" />
        </th>
      </tr>
    );
  };

  return (
    <div className={`w-full flex bg-[#222629]`}>
      <div className="w-2/12">
        <AdminNavbar />
      </div>
      <div className="w-10/12 flex flex-col items-center">
        <AdminTopBar />
        <div className="flex w-full">
          <div className="flex flex-col gap-3 w-full ">
            <h1 className={`text-center text-[#BDA9A9] text-xl font-bold mt-5`}>
              Blogs
            </h1>
            <div className="flex flex-col ">
              <div className="flex w-full items-center justify-between mt-8 px-[3rem]">
                <h1 className="text-left text-[white] text-base font-normal px-6">
                  Your Blogs
                </h1>
                <button
                  className="text-sm bg-[#E97500] px-10 mr-5 py-2 rounded-xl text-white border-[#E97500] hover:shadow-2xl"
                  onClick={() => navigate("/admin/createSql")}
                >
                  Upload{" "}
                </button>
              </div>

              <div className="py-8 w-full flex justify-center items-center text-[10px]">
                <div className="w-[90%]">
                  <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-white">
                      <thead
                        className={`text-xs text-white uppercase bg-[#E97500]`}
                      >
                        <tr>
                          <th scope="col" className="py-3 px-6">
                            SNo.
                          </th>
                          <th scope="col" className="py-3 px-6">
                            Question
                          </th>
                          <th scope="col" className="py-3 px-6">
                            See More
                          </th>
                          <th scope="col" className="py-3 px-6">
                            Edit
                          </th>
                          <th scope="col" className="py-3 px-6">
                            Delete
                          </th>
                        </tr>
                      </thead>
                      {sqls.length > 0 && (
                        <tbody>
                          {sqls.length &&
                            sqls.map((blog, index) => {
                              return (
                                <TableComponent key={index} item={blog} index />
                              );
                            })}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>

              {/* View Modal */}
              {viewData?.title && (
                <Modal
                  visible={preview}
                  width="90%"
                  effect="fadeInUp"
                  onClickAway={() => {
                    setPreview(false);
                    setViewData({});
                  }}
                >
                  <div className="overflow-y-auto max-h-[90vh]">
                    <div className="flex flex-col pt-4 w-10/12 mx-auto ">
                      <div className="w-full">
                        <label htmlFor="title" className="text-black">
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={viewData.title}
                          disabled
                          className="w-full border border-black mt-2 pl-2 h-10 rounded-[8px]"
                        />
                      </div>
                      <div className="w-full mt-4">
                        <label htmlFor="title" className="text-black">
                          Problem Description
                        </label>
                        <div className="border border-black rounded-md p-4 h-[150px] overflow-y-auto">
                          {Parser(viewData.description)}
                        </div>
                      </div>
                      <div className="w-full mt-4">
                        <label htmlFor="title" className="text-black">
                          Tables
                        </label>
                        <div className="flex flex-wrap border border-black rounded-md">
                          {viewData.tables.map((table, tableIndex) => (
                            <div
                              key={tableIndex}
                              className=" pb-3 pt-2 mx-5 min-w-[20%]"
                            >
                              <table className="table-auto w-full">
                                <tbody>
                                  {table.tableData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                      {row.map((cell, colIndex) => (
                                        <td
                                          key={colIndex}
                                          className={` max-w-[${
                                            100 / table.numCols
                                          }%]`}
                                        >
                                          <input
                                            type="text"
                                            className={`text-black px-3 ${
                                              rowIndex === 0
                                                ? "bg-white border-b-black border-2 font-extrabold border-t-0 border-x-0"
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
                        <div className="w-full mt-4">
                          <label htmlFor="title" className="text-black">
                            Difficulty
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={
                              viewData.difficulty.charAt(0).toUpperCase() +
                              viewData.difficulty.slice(1)
                            }
                            disabled
                            className="w-full border border-black mt-2 pl-2 h-10 rounded-[8px]"
                          />
                        </div>
                        <div className="w-full mt-4">
                          <label htmlFor="title" className="text-black">
                            Score
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={viewData.score}
                            disabled
                            className="w-full border border-black mt-2 pl-2 h-10 rounded-[8px]"
                          />
                        </div>
                        <div className="w-full my-4">
                          <label htmlFor="title" className="text-black">
                            Solution
                          </label>
                          <div className="w-[90%] h-[30px] bg-[#1E1E1E] rounded-t-2xl"></div>
                          <Editor
                            height="60vh"
                            width={`90%`}
                            theme="vs-dark"
                            defaultLanguage="java"
                            language="sql"
                            value={viewData.solution}
                            options={{ readOnly: true }}
                            tabIndex={4}
                          />
                          <div className="w-[90%] h-[30px] bg-[#1E1E1E] rounded-b-2xl mt-[-4px]"></div>
                        </div>
                        <div className="w-full mb-10">
                          <label htmlFor="title" className="text-black">
                            Video Link
                          </label>
                          {viewData.videoLink ? (
                            <Media>
                              <div className="media mt-4 w-full flex justify-center items-center">
                                <div className="media-player">
                                  <Player
                                    src={
									  viewData.viewLink
                                    }
                                  />
                                </div>
                              </div>
                            </Media>
                          ):(<div className="my-4 mx-auto justify-center text-center">
							No Video Solution for this question
						  </div>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSql;
