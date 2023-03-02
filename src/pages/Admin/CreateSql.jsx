import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "../../assets/CSS/index.css";
import { AdminTopBar, AdminNavbar } from "../../components";
import "react-quill/dist/quill.snow.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import codeContext from "../../context/CodeContext";
import Modal from "react-awesome-modal";
import Editor from "@monaco-editor/react";
import { AiOutlineClose } from "react-icons/ai";

const CreateSql = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState(false);
  const [editTable, setEditTable] = useState(false);
  const [editTableData, setEditTableData] = useState({});
  const [editIndex, setEditIndex] = useState(undefined);
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    tables: [[[]]],
    companyTag: [],
    difficulty: "easy",
    keywords: "",
    score: 0,
    solution: "",
    videoLink: "",
  });
  const [newTableData, setNewTableData] = useState({
    numRows: 1,
    numCols: 2,
    tableData: Array.from({ length: 1 }, (_, rowIndex) =>
      Array.from({ length: 2 }, (_, colIndex) => {
        return rowIndex === 0 && colIndex === 0
          ? "Heading 1"
          : rowIndex === 0 && colIndex === 1
          ? "Heading 2"
          : "";
      })
    ),
  });

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

  const handleNumRowsChange = (event, edit = false) => {
    const numRows = parseInt(event.target.value);
    if (edit == true) {
      setEditTableData((prevTableData) => {
        const newTableData = {
          ...prevTableData,
          numRows: numRows,
        };
        if (numRows > prevTableData.numRows) {
          const newRows = Array.from(
            { length: numRows - prevTableData.numRows },
            () => Array.from({ length: prevTableData.numCols }, () => "")
          );
          editTableData.tableData = [...prevTableData.tableData, ...newRows];
        } else {
          editTableData.tableData = prevTableData.tableData.slice(0, numRows);
        }
        return newTableData;
      });
    } else {
      setNewTableData((prevTableData) => {
        const newTableData = {
          ...prevTableData,
          numRows: numRows,
        };
        if (numRows > prevTableData.numRows) {
          const newRows = Array.from(
            { length: numRows - prevTableData.numRows },
            () => Array.from({ length: prevTableData.numCols }, () => "")
          );
          newTableData.tableData = [...prevTableData.tableData, ...newRows];
        } else {
          newTableData.tableData = prevTableData.tableData.slice(0, numRows);
        }
        return newTableData;
      });
    }
  };

  const handleNumColsChange = (event, edit = false) => {
    const numCols = parseInt(event.target.value);
    if (edit == true) {
      setEditTableData((prevTableData) => {
        const newTableData = {
          ...prevTableData,
          numCols: numCols,
        };
        if (numCols > prevTableData.numCols) {
          const newCols = Array.from(
            { length: numCols - prevTableData.numCols },
            () => ""
          );
          editTableData.tableData = prevTableData.tableData.map((row) => [
            ...row,
            ...newCols,
          ]);
        } else {
          editTableData.tableData = prevTableData.tableData.map((row) =>
            row.slice(0, numCols)
          );
        }
        return newTableData;
      });
    } else {
      setNewTableData((prevTableData) => {
        const newTableData = {
          ...prevTableData,
          numCols: numCols,
        };
        if (numCols > prevTableData.numCols) {
          const newCols = Array.from(
            { length: numCols - prevTableData.numCols },
            () => ""
          );
          newTableData.tableData = prevTableData.tableData.map((row) => [
            ...row,
            ...newCols,
          ]);
        } else {
          newTableData.tableData = prevTableData.tableData.map((row) =>
            row.slice(0, numCols)
          );
        }
        return newTableData;
      });
    }
  };

  const handleCellValueChange = (event, rowIndex, colIndex, edit = false) => {
    const value = event.target.value;
    if (edit) {
      setEditTableData((prevTableData) => {
        const newTableData = {
          ...prevTableData,
          tableData: prevTableData.tableData.map((row, i) => {
            if (i === rowIndex) {
              return row.map((cell, j) => {
                if (j === colIndex) {
                  return value;
                } else {
                  return cell;
                }
              });
            } else {
              return row;
            }
          }),
        };
        return newTableData;
      });
    } else {
      setNewTableData((prevTableData) => {
        const newTableData = {
          ...prevTableData,
          tableData: prevTableData.tableData.map((row, i) => {
            if (i === rowIndex) {
              return row.map((cell, j) => {
                if (j === colIndex) {
                  return value;
                } else {
                  return cell;
                }
              });
            } else {
              return row;
            }
          }),
        };
        return newTableData;
      });
    }
  };

  const handleAddTable = (tableData, tableIndex = 0, edit = false) => {
    let nonEmptyCellCount = 0;

    tableData.tableData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.trim() !== "") {
          nonEmptyCellCount++;
        }
      });
    });

    const rows = tableData.tableData.length;
    const cols = tableData.tableData[0].length;
    if (rows * cols !== nonEmptyCellCount) {
      swal({
        title: "Error",
        text: "Please fill all the cells",
        icon: "error",
      });
      return;
    }

    if (edit) {
      const newTables = [...tables];
      newTables[tableIndex] = tableData;
      setTables(newTables);
      setEditTable(false);
      setUploadData({ ...uploadData, tables: newTables });
    } else {
      setTables((prevTables) => [...prevTables, tableData]);
      setNewTableData({
        numRows: 1,
        numCols: 2,
        tableData: Array.from({ length: 1 }, (_, rowIndex) =>
          Array.from({ length: 2 }, (_, colIndex) => {
            console.log("new table");
            return rowIndex === 0 && colIndex === 0
              ? "Heading 1"
              : rowIndex === 0 && colIndex === 1
              ? "Heading 2"
              : "";
          })
        ),
      });
      setNewTable(false);
      setUploadData({ ...uploadData, tables: [...tables, tableData] });
    }
  };

  console.log(uploadData);
  const handleRemoveTable = (tableIndex) => {
    setTables((prevTables) =>
      prevTables.filter((table, index) => index !== tableIndex)
    );
    const updatedUploadData = { ...uploadData };

    // Remove the table from the topicTag array in the uploadData object
    updatedUploadData.tables.splice(tableIndex, 1);

    // Update the uploadData state with the updated object
    setUploadData(updatedUploadData);
  };

  const { addSql, setLogin } = useContext(codeContext);
  const handleUpload = () => {
    // return;
    if (
      uploadData.title === "" ||
      uploadData.description === "" ||
      uploadData.content === "<p><br></p>" ||
      uploadData.content === "" ||
      uploadData.tables.length === 0 ||
      uploadData.difficulty === "" ||
      uploadData.companyTag === "" ||
      uploadData.score <= 0 ||
      uploadData.solution === ""
    ) {
      swal({
        title: "Error",
        text: "Please fill all the fields",
        icon: "error",
      });
      return;
    } else {
      addSql(uploadData);
      console.log(uploadData);
      swal({
        title: "Success",
        text: "Question added successfully",
        icon: "success",
      });
      navigate("/admin/sql");
    }
  };

  const divStyle = `flex w-full flex-col gap-2 text-[#202128] py-2`;
  const labelStyle = `text-white`;
  const inputStyle = `w-full border rounded-md p-2`;
  const activeClass = `bg-[#E97500] border-[#E97500] text-white px-4 py-2 rounded-xl cursor-pointer`;
  const unactiveClass = `bg-[#F2F2F2] text-[#3A355C] px-4 py-2 rounded-xl cursor-pointer `;

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
    <div className={`w-full flex bg-[#222629]`}>
      <div className="w-2/12">
        <AdminNavbar />
      </div>
      <div className="w-10/12">
        <AdminTopBar />
        <div className="flex w-full ">
          <div className="flex flex-col gap-3 w-full ">
            <h1 className={`text-center text-[#BDA9A9] text-xl font-bold mt-5`}>
              Add a SQL question
            </h1>
            <div className="flex flex-col "></div>
            <div className="flex flex-col w-10/12 mx-auto">
              <div className="w-full">
                <label htmlFor="title" className="text-white">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={uploadData.title}
                  placeholder="Title"
                  className="w-full pl-2 h-10 rounded-[8px] mb-5"
                  onChange={(e) => {
                    setUploadData({
                      ...uploadData,
                      title: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <label className="text-white">Problem Description</label>
                <div className=" bg-white mb-5">
                  <ReactQuill
                    theme="snow"
                    value={uploadData.description}
                    placeholder="Description"
                    name="description"
                    modules={{
                      toolbar: {
                        container: [
                          [{ header: [1, 2, 3, 4, 5, 6, false] }],
                          ["bold", "italic", "underline"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          [{ align: [] }],
                          ["link", "image"],
                          ["clean"],
                          [{ color: [] }],
                        ],
                      },
                    }}
                    onChange={(e) => {
                      setUploadData({
                        ...uploadData,
                        description: e,
                      });
                    }}
                  />
                </div>
                <label className={labelStyle}>Tables</label>
                <div className="mx-10 text-white w-full ">
                <div className="flex flex-wrap">
                    {tables.map((table, tableIndex) => (
                      <div key={tableIndex} className="mr-10 min-w-[20%]">
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
                        <button onClick={() => handleRemoveTable(tableIndex)}>
                          Remove Table
                        </button>
                        <button
                          className="float-right"
                          onClick={() => {
                            setEditTable(true);
                            setEditTableData(table);
                            setEditIndex(tableIndex);
                          }}
                        >
                          {" "}
                          Edit Table
                        </button>
                      </div>
                    ))}
                  </div>
                  <br />
                </div>
                <button
                  onClick={() => {
                    setNewTable(true);
                  }}
                  className="bg-white px-3 rounded-md"
                >
                  Add Table
                </button>
                <div className={divStyle}>
                  <label className={labelStyle}>Difficulty</label>
                  <select
                    value={uploadData.difficulty}
                    onChange={(e) =>
                      setUploadData({
                        ...uploadData,
                        difficulty: e.target.value,
                      })
                    }
                    className=" text-center w-[40%] justify-between border border-white hover:border-gray-800 bg-white text-black px-4 py-2 pr-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div className={divStyle}>
                  <label className={labelStyle}>Company Tags</label>
                  <div className="flex flex-wrap w-full gap-4">
                    {CompanyTags.map((tag) => (
                      <div
                        className={
                          uploadData.companyTag.includes(tag)
                            ? activeClass
                            : unactiveClass
                        }
                        onClick={() => {
                          if (uploadData.companyTag.includes(tag)) {
                            setUploadData({
                              ...uploadData,
                              companyTag: uploadData.companyTag.filter(
                                (t) => t !== tag
                              ),
                            });
                          } else {
                            setUploadData({
                              ...uploadData,
                              companyTag: [...uploadData.companyTag, tag],
                            });
                          }
                        }}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={divStyle}>
                  <label className={labelStyle}>Score</label>
                  <input
                    type="number"
                    className={inputStyle}
                    value={uploadData.score}
                    placeholder="Score"
                    onChange={(e) => {
                      setUploadData({
                        ...uploadData,
                        score: e.target.value,
                      });
                    }}
                  />
                </div>
                <label className={labelStyle}>Solution</label>
                <div className="w-full flex flex-col py-4">
                  <div className="w-[90%] h-[30px] bg-[#1E1E1E] rounded-t-2xl"></div>
                  <Editor
                    height="60vh"
                    width={`90%`}
                    theme="vs-dark"
                    defaultLanguage="sql"
                    value={`${uploadData.solution}`}
                    onChange={(value, event) => {
                      setUploadData({
                        ...uploadData,
                        solution: value,
                      });
                    }}
                    tabIndex={4}
                  />
                  <div className="w-[90%] h-[30px] bg-[#1E1E1E] rounded-b-2xl mt-[-4px]"></div>
                </div>

                <div className={divStyle}>
                  <label className={labelStyle}>Video Link</label>
                  <input
                    type="text"
                    className={inputStyle}
                    value={uploadData.videoLink}
                    placeholder="Video Link"
                    onChange={(e) =>
                      setUploadData({
                        ...uploadData,
                        videoLink: e.target.value,
                      })
                    }
                  />
                </div>
                {/*Create New table modal*/}
                <Modal
                  visible={newTable}
                  width="90%"
                  height="90%"
                  onClickAway={() => {
                    swal({
                      title: "Do you want to discard your changes?",
                      icon: "warning",
                      buttons: true,
                    }).then((res) => {
                      if (res) {
                        setNewTable(false);
                      }
                    });
                  }}
                >
                  <div className="flex w-full justify-end px-4 py-4">
                    <AiOutlineClose
                      className="text-black hover:font-bold text-[20px] cursor-pointer"
                      onClick={() => {
                        swal({
                          title: "Do you want to discard your changes?",
                          icon: "warning",
                          buttons: true,
                        }).then((res) => {
                          if (res) {
                            setNewTable(false);
                          }
                        });
                      }}
                    />
                  </div>
                  <div className="mx-10 text-black w-full mt-10 ">
                    <div className="flex flex-wrap">
                      <div className="mr-10 min-w-[20%]">
                        <div className="mb-3">
                          <label htmlFor="newTableRow" className="mr-3">
                            Number of Rows:
                          </label>
                          <input
                            type="number"
                            id={`newTableRow`}
                            value={newTableData.numRows}
                            onChange={(event) => {
                              handleNumRowsChange(event);
                            }}
                            className="text-black px-3 border-black border"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor={`newTableCol`} className="mr-3">
                            Number of Columns:
                          </label>
                          <input
                            type="number"
                            id={`newTableCol`}
                            value={newTableData.numCols}
                            onChange={(event) => handleNumColsChange(event)}
                            className="text-black px-3 border-black border"
                          />
                        </div>
                        <div className="max-h-[50vh] overflow-y-auto">
                          <table className="table-auto w-full">
                            <tbody>
                              {newTableData.tableData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  {row.map((cell, colIndex) => (
                                    <td
                                      key={colIndex}
                                      className={`max-w-[${
                                        100 / newTableData.numCols
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
                                        value={cell}
                                        defaultValue={`${
                                          rowIndex === 0 && colIndex === 0
                                            ? "Heading 1"
                                            : ""
                                        }`}
                                        onChange={(event) => {
                                          handleCellValueChange(
                                            event,
                                            rowIndex,
                                            colIndex
                                          );
                                        }}
                                      />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <button
                          onClick={() => {
                            handleAddTable(newTableData);
                          }}
                          className="border mt-5 border-black bg-gray-500 text-white rounded-md px-4"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                    <br />
                  </div>
                </Modal>
                {/*Edit table modal*/}
                {editTableData.numRows && (
                  <Modal
                    visible={editTable}
                    width="90%"
                    height="90%"
                    onClickAway={() => {
                      swal({
                        title: "Do you want to discard your changes?",
                        icon: "warning",
                        buttons: true,
                      }).then((res) => {
                        if (res) {
                          setEditTable(false);
                        }
                      });
                    }}
                  >
                    <div className="flex w-full justify-end px-4 py-4">
                      <AiOutlineClose
                        className="text-black hover:font-bold text-[20px] cursor-pointer"
                        onClick={() => {
                          swal({
                            title: "Do you want to discard your changes?",
                            icon: "warning",
                            buttons: true,
                          }).then((res) => {
                            if (res) {
                                setEditTable(false);
                            }
                          });
                        }}
                      />
                    </div>
                    <div className="mx-10 text-black w-full mt-10 ">
                      <div className="flex flex-wrap">
                        <div className="mr-10 min-w-[20%]">
                          <div className="mb-3">
                            <label htmlFor="newTableRow" className="mr-3">
                              Number of Rows:
                            </label>
                            <input
                              type="number"
                              id={`newTableRow`}
                              value={editTableData.numRows}
                              onChange={(event) => {
                                handleNumRowsChange(event, true);
                              }}
                              className="text-black px-3 border-black border"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor={`newTableCol`} className="mr-3">
                              Number of Columns:
                            </label>
                            <input
                              type="number"
                              id={`newTableCol`}
                              value={editTableData.numCols}
                              onChange={(event) =>
                                handleNumColsChange(event, true)
                              }
                              className="text-black px-3 border-black border"
                            />
                          </div>
                          <div className="max-h-[50vh] overflow-y-auto">
                            <table className="table-auto w-full">
                              <tbody>
                                {editTableData.tableData.map(
                                  (row, rowIndex) => (
                                    <tr key={rowIndex}>
                                      {row.map((cell, colIndex) => (
                                        <td
                                          key={colIndex}
                                          className={` max-w-[${
                                            100 / editTableData.numCols
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
                                            value={cell}
                                            defaultValue={`${
                                              rowIndex === 0 && colIndex === 0
                                                ? "Heading 1"
                                                : ""
                                            }`}
                                            onChange={(event) => {
                                              handleCellValueChange(
                                                event,
                                                rowIndex,
                                                colIndex,
                                                true
                                              );
                                            }}
                                          />
                                        </td>
                                      ))}
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                          <button
                            onClick={() => {
                              handleAddTable(editTableData, editIndex, true);
                            }}
                            className="border mt-5 border-black bg-gray-500 text-white rounded-md px-4"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                      <br />
                    </div>
                  </Modal>
                )}
                <div>
                  <button
                    className="text-sm bg-[#E97500] mb-10 px-4 py-2 rounded-xl w-full text-white border-[#E97500] hover:shadow-2xl"
                    onClick={() => handleUpload()}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSql;
