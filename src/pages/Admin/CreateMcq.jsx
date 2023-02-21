import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "../../assets/CSS/index.css";
import { AdminTopBar, AdminNavbar } from "../../components";
import "react-quill/dist/quill.snow.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import codeContext from "../../context/CodeContext";
import { Company } from "..";

const CreateMcq = () => {
  const navigate = useNavigate();
  const [uploadData, setUploadData] = useState({
    question: "",
    options: [
      {
        no: 1,
        option: "",
      },
      {
        no: 2,
        option: "",
      },
      {
        no: 3,
        option: "",
      },
      {
        no: 4,
        option: "",
      },
    ],
    answer: "",
  });

  function handleOptionChange(optionNo, optionValue) {
    setUploadData((prevState) => {
      const options = [...prevState.options];
      const optionIndex = options.findIndex((option) => option.no === optionNo);
      options[optionIndex] = { ...options[optionIndex], option: optionValue };
      return { ...prevState, options };
    });
  }

  const { addMcq } = useContext(codeContext);
  const handleUpload = () => {
    console.log(uploadData);

    if (
      uploadData.question === "" ||
      uploadData.options[0].option === "" ||
      uploadData.options[1].option === "" ||
      uploadData.options[2].option === "" ||
      uploadData.options[3].option === "" ||
      uploadData.answer===""
    ) {
      swal({
        title: "Error",
        text: "Please fill all the fields",
        icon: "error",
      });
      return;
    } else {
      addMcq(uploadData);
      swal({
        title: "Success",
        text: "Blog added successfully",
        icon: "success",
      });
      navigate("/admin/mcqs");
    }
  };

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
                  value={uploadData.question}
                  placeholder="Question:"
                  className="w-full pl-2 h-10 rounded-[8px] mb-5"
                  onChange={(e) => {
                    console.log(uploadData);
                    setUploadData({
                      ...uploadData,
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
                      value={uploadData.options[no-1]?.option}
                      placeholder={`Option ${no}:`}
                      className="w-full pl-2 h-10 rounded-[8px] mb-5"
                      onChange={(e) => {
                        console.log(uploadData);
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
                  value={uploadData.answer}
                  placeholder={`Answer`}
                  className="w-full pl-2 h-10 rounded-[8px] mb-5"
                  onChange={(e) => {
                    console.log(uploadData);
                    setUploadData({...uploadData,answer:e.target.value})
                  }}
                />
              </div>

              <button
                className="text-sm bg-[#E97500] mb-10 px-4 py-2 rounded-xl w-full text-white border-[#E97500] hover:shadow-2xl"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMcq;
