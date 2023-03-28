import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "../../assets/CSS/index.css";
import { AdminTopBar, AdminNavbar } from "../../components";
import "react-quill/dist/quill.snow.css";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import codeContext from "../../context/CodeContext";
import Modal from "react-awesome-modal";
import Editor from "@monaco-editor/react";
import { AiOutlineClose } from "react-icons/ai";

const EditSql = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState(false);
  const [editTable, setEditTable] = useState(false);
  const [editTableData, setEditTableData] = useState({});
  const [editIndex, setEditIndex] = useState(undefined);
  const [editData, setEditData] = useState(undefined);
  const { getSql, sql, editSql,getAdmin,adminData } = useContext(codeContext);
  const [newTableData, setNewTableData] = useState({
    numRows: 1,
    numCols: 2,
    name: "",
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
    (async () => {
      const d = localStorage.getItem("admin-token");
      const admin = await getAdmin(d);

      const date = new Date(admin?.date);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      if (diffDays > 1) {
        localStorage.removeItem("admin-token");
        localStorage.removeItem("token");
        navigate('/admin/q1w2e3r4t528032023')
      }
      if (admin?.role.toLowerCase() !== "admin") {
        localStorage.removeItem("admin-token");
        navigate('/admin/q1w2e3r4t528032023')
      } 
    })();
    const d = localStorage.getItem("token");
    getSql(id,d);
  }, []);
  useEffect(() => {
    setEditData(sql);
    setTables(editData?.tables);
  }, [sql]);

  useEffect(() => {
    const admintoken = localStorage.getItem("admin-token");
    if (admintoken === undefined || admintoken === null) {
      localStorage.removeItem("admin-token");
      navigate("/admin/q1w2e3r4t528032023");
    }
    if (adminData?.status === true) {
      localStorage.setItem("admin-token", adminData.token);
    }

  }, [adminData]);
 

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

  const handleNameChange = (event, edit = false) => {
    const name = event.target.value;
    if (edit === true) {
      setEditTableData((prevTableData) => {
        const newTableData = {
          ...prevTableData,
          name: name,
        };
        return newTableData;
      });
    } else {
      setNewTableData((prevTableData) => {
        const newTabledata = { ...prevTableData, name: name };
        return newTableData;
      });
    }
  };
  const handleNumColsChange = (event, edit = false) => {
    const numCols = parseInt(event.target.value);
    if (edit === true) {
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
    if (rows * cols !== nonEmptyCellCount || tableData.name.trim(" ") === "") {
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
      setEditData({ ...editData, tables: newTables });
    } else {
      setTables((prevTables) => [...prevTables, tableData]);
      setNewTableData({
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
      setNewTable(false);
      setEditData({ ...editData, tables: [...tables, tableData] });
    }
  };

  const handleRemoveTable = (tableIndex) => {
    setTables((prevTables) =>
      prevTables.filter((table, index) => index !== tableIndex)
    );
    const updatedUploadData = { ...editData };

    // Remove the table from the topicTag array in the editData object
    updatedUploadData.tables.splice(tableIndex, 1);

    // Update the editData state with the updated object
    setEditData(updatedUploadData);
  };
  const handleUpload = () => {
    // return;
    if (
      editData.title === "" ||
      editData.description === "" ||
      editData.content === "<p><br></p>" ||
      editData.content === "" ||
      editData.tables.length === 0 ||
      editData.difficulty === "" ||
      editData.companyTag === "" ||
      editData.score <= 0 ||
      editData.solution === ""
    ) {
      swal({
        title: "Error",
        text: "Please fill all the fields",
        icon: "error",
      });
      return;
    } else {
      editSql(id, editData);
      console.log(editData);
      swal({
        title: "Success",
        text: "Question edited successfully",
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
        {editData?.title && (
          <div className="flex w-full ">
            <div className="flex flex-col gap-3 w-full ">
              <h1
                className={`text-center text-[#BDA9A9] text-xl font-bold mt-5`}
              >
                Edit SQL question
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
                    value={editData.title}
                    placeholder="Title"
                    className="w-full pl-2 h-10 rounded-[8px] mb-5"
                    onChange={(e) => {
                      setEditData({
                        ...editData,
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
                      value={editData.description}
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
                        setEditData({
                          ...editData,
                          description: e,
                        });
                      }}
                    />
                  </div>
                  <label className={labelStyle}>Tables</label>
                  <div className="mx-10 text-white w-full ">
                    <div className="flex flex-wrap">
                      {tables?.length > 0 &&
                        tables.map((table, tableIndex) => (
                          <div key={tableIndex} className="mr-10 min-w-[20%]">
                            <table className="table-auto w-full">
                              <tbody>
                                <tr className="">
                                  <td className="font-bold">{table.name}</td>
                                </tr>
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
                            <button
                              onClick={() => handleRemoveTable(tableIndex)}
                            >
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
                      value={editData.difficulty}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
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
                            editData.companyTag.includes(tag)
                              ? activeClass
                              : unactiveClass
                          }
                          onClick={() => {
                            if (editData.companyTag.includes(tag)) {
                              setEditData({
                                ...editData,
                                companyTag: editData.companyTag.filter(
                                  (t) => t !== tag
                                ),
                              });
                            } else {
                              setEditData({
                                ...editData,
                                companyTag: [...editData.companyTag, tag],
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
                      value={editData.score}
                      placeholder="Score"
                      onChange={(e) => {
                        setEditData({
                          ...editData,
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
                      value={`${editData.solution}`}
                      onChange={(value, event) => {
                        setEditData({
                          ...editData,
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
                      value={editData.videoLink}
                      placeholder="Video Link"
                      onChange={(e) =>
                        setEditData({
                          ...editData,
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
                          <div className="mb-3">
                            <label htmlFor={`newTableName`} className="mr-3">
                              Name of Table:
                            </label>
                            <input
                              type="text"
                              id={`newTableName`}
                              value={newTableData.name}
                              onChange={(event) => handleNameChange(event)}
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
                            <div className="mb-3">
                              <label htmlFor={`newTableName`} className="mr-3">
                                Name of Table:
                              </label>
                              <input
                                type="text"
                                id={`newTableName`}
                                value={editTableData.name}
                                onChange={(event) =>
                                  handleNameChange(event, true)
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
        )}
      </div>
    </div>
  );
};

export default EditSql;
