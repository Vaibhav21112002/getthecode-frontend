import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "../../assets/CSS/index.css";
import { AdminTopBar, AdminNavbar } from "../../components";
import "react-quill/dist/quill.snow.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import codeContext from "../../context/CodeContext";
import { Company } from "..";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [uploadData, setUploadData] = useState({
    title: "",
    tag: "",
    company: "",
    keywords: "",
    content: "",
  });

  const { addBlog } = useContext(codeContext);
  const handleUpload = () => {

    if (
      uploadData.title === "" ||
      uploadData.tag === "" ||
      uploadData.keywords === "" ||
      uploadData.content === "" ||
      uploadData.content === "<p><br></p>"
    ) {
      swal({
        title: "Error",
        text: "Please fill all the fields",
        icon: "error",
      });
      return;
    } else if (
      uploadData.tag === "Interview Experiences" &&
      uploadData.company === ""
    ) {
      swal({
        title: "Error",
        text: "Please fill the company name",
        icon: "error",
      });
      return;
    } else if (
      uploadData.company !== "" &&
      uploadData.tag !== "Interview Experiences"
    ) {
      setUploadData({ ...uploadData, company: "" });
      addBlog(uploadData);
      swal({
        title: "Success",
        text: "Blog added successfully",
        icon: "success",
      });
      navigate("/admin/blogs");
    } else {
      addBlog(uploadData);
      swal({
        title: "Success",
        text: "Blog added successfully",
        icon: "success",
      });
      navigate("/admin/blogs");
    }
  };
  const [isInterview, setIsInterview] = useState(false);
  const topics = [
    "",
    "Interview Experiences",
    "Latest Tech Innovations",
    "Miscellaneous",
  ];

  const divStyle = `flex w-full flex-col gap-2 text-[#202128] py-2`;
  const activeClass = `bg-[#E97500] border-[#E97500] text-white px-4 py-2 rounded-xl cursor-pointer`;
  const unactiveClass = `bg-[#F2F2F2] text-[#3A355C] px-4 py-2 rounded-xl cursor-pointer `;

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
                  Your New Blog
                </h1>
              </div>
            </div>
            <div className="flex flex-col w-10/12 mx-auto">
              <div className="w-full">
                <label htmlFor="title" className="text-white">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={uploadData.title}
                  placeholder="Title:"
                  className="w-full pl-2 h-10 rounded-[8px] mb-5"
                  onChange={(e) => {
                    setUploadData({
                      ...uploadData,
                      title: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="w-full">
                <label htmlFor="title" className="text-white">
                  Keywords
                </label>
                <input
                  type="text"
                  name="title"
                  value={uploadData.keywords}
                  placeholder="keywords"
                  className="w-full pl-2 h-10 rounded-[8px] mb-5"
                  onChange={(e) => {
                    setUploadData({
                      ...uploadData,
                      keywords: e.target.value,
                    });
                  }}
                />
              </div>

              <div className={divStyle}>
                <label className="text-white">Tags</label>
                <select
                  value={uploadData.tag}
                  onChange={(e) =>
                    setUploadData({ ...uploadData, tag: e.target.value })
                  }
                  className="flex flex-wrap w-full h-[40px] rounded-lg gap-8 mb-5"
                >
                  {topics.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                {uploadData.tag === "Interview Experiences" && (
                  <div className="w-full">
                    <label htmlFor="title" className="text-white">
                      Company name
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={uploadData.company}
                      placeholder="Company Name: "
                      className="w-full pl-2 h-10 rounded-[8px] mb-5"
                      onChange={(e) => {
                        setUploadData({
                          ...uploadData,
                          company: e.target.value,
                        });
                      }}
                    />
                  </div>
                )}
                <label className="text-white">Your Blog</label>
                <div className=" bg-white mb-10">
                  <ReactQuill
                    theme="snow"
                    value={uploadData.content}
                    placeholder="blog"
                    name="blog"
                    style={{ minHeight: "200px" }}
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
                        content: e,
                      });
                    }}
                  />
                </div>
                <div>
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
      </div>
    </div>
  );
};

export default CreateBlog;
