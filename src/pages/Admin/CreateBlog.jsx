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
              <div className="flex w-10/12 mx-auto items-center justify-between mt-8">
                <h1 className="text-left text-[white] text-base font-normal">
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
                <div class="relative inline-block w-full">
                  <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline">
                    {topics.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" viewBox="0 0 20 20">
                      <path d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7l-5 5z" />
                    </svg>
                  </div>
                </div>
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
