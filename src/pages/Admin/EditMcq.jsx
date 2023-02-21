import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "../../assets/CSS/index.css";
import { AdminTopBar, AdminNavbar } from "../../components";
import "react-quill/dist/quill.snow.css";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import codeContext from "../../context/CodeContext";

const EditMcq = () => {
  const navigate = useNavigate();
  const [editData, setEditData] = useState(undefined);
  const { id } = useParams();

  const { editMcq, getMcq, mcq } = useContext(codeContext);
  useEffect(() => {
    getMcq(id);
  }, []);

  useEffect(() => {
    setEditData(mcq);
  }, [mcq]);

  console.log(editData);
  // console.log(mcq);
  function handleOptionChange(optionNo, optionValue) {
    setEditData((prevState) => {
      const options = [...prevState.options];
      const optionIndex = options.findIndex((option) => option.no === optionNo);
      options[optionIndex] = { ...options[optionIndex], option: optionValue };
      return { ...prevState, options };
    });
  }

  const handleUpload = () => {
    console.log(editData);

    if (
      editData.question === "" ||
      editData.options[0].option === "" ||
      editData.options[1].option === "" ||
      editData.options[2].option === "" ||
      editData.options[3].option === "" ||
      editData.ans === 0
    ) {
      swal({
        title: "Error",
        text: "Please fill all the fields",
        icon: "error",
      });
      return;
    } else {
      swal({
        title: "Do you stil want to edit the question ?",
        icon: "warning",
        buttons: true,
      }).then((res) => {
        if (res) {
          editMcq(id, editData);
          swal({
            title: "Success",
            text: "Question edited successfully",
            icon: "success",
          });
          navigate("/admin/mcqs");
        } else {
          swal({
            title: "Cancelled",
            text: "Question not edited",
            icon: "error",
          });
        }
      });
    }
  };

  if (editData === undefined || editData?.question === undefined) {
    return <div>Loading.......</div>;
  }

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
              Create A blog
            </h1>
            <div className="flex flex-col ">
              <div className="flex w-full items-center justify-between mt-8 px-[3rem]">
                <h1 className="text-left text-[white] text-base font-normal px-4">
                  Add a MCQ
                </h1>
              </div>
            </div>
            <div className="flex flex-col w-10/12 mx-auto">
              <div className="w-full">
                <label htmlFor="question" className="text-white">
                  Question
                </label>
                <input
                  type="text"
                  name="question"
                  value={editData.question}
                  placeholder="Question:"
                  className="w-full pl-2 h-10 rounded-[8px] mb-5"
                  onChange={(e) => {
                    console.log(editData);
                    setEditData({
                      ...editData,
                      question: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="w-full">
                {[1, 2, 3, 4].map((no) => (
                  <>
                    <label htmlFor={`option_${no}`} className="text-white">
                      {`Option ${no}`}
                    </label>
                    <input
                      type="text"
                      name={`option_${no}`}
                      value={editData.options[no - 1]?.option}
                      placeholder={`Option ${no}:`}
                      className="w-full pl-2 h-10 rounded-[8px] mb-5"
                      onChange={(e) => {
                        console.log(editData);
                        handleOptionChange(no, e.target.value);
                      }}
                    />
                  </>
                ))}
                <label htmlFor={`answer`} className="text-white">
                  {`Which option is the correction answer?`}
                </label>
                <input
                  type="text"
                  name={`answer`}
                  value={editData.answer}
                  placeholder={`Answer`}
                  className="w-full pl-2 h-10 rounded-[8px] mb-5"
                  onChange={(e) => {
                    console.log(editData);
                    setEditData({ ...editData, answer: e.target.value });
                  }}
                />
              </div>

              <button
                className="text-sm bg-[#E97500] mb-10 px-4 py-2 rounded-xl w-full text-white border-[#E97500] hover:shadow-2xl"
                onClick={handleUpload}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMcq;
