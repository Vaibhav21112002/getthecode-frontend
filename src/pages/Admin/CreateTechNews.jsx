import React, { useState, useContext, useEffect } from "react";
import "../../assets/CSS/index.css";
import { AdminTopBar, AdminNavbar } from "../../components";
import "react-quill/dist/quill.snow.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import codeContext from "../../context/CodeContext";
import Filebase64 from "react-file-base64";
import MarkdownEditor from "@uiw/react-markdown-editor";

const CreateTechNews = () => {
  const navigate = useNavigate();
  const { addTechNew, addUploadImage,getRole } = useContext(codeContext);
  const [uploadData, setUploadData] = useState({
    title: "",
    tag: "",
    company: "",
    keywords: "",
    content: "",
    image: "",
  });
   useEffect(() => {
    (async () => {
      const id = localStorage.getItem("role");
      const role = await getRole(id);
      console.log(role);
      if (role !== "admin") {
        navigate("/");
      }
    })();
  }, []);

  const handleUpload = async () => {
    console.log(uploadData);
    if (uploadData.image != "") {
      const url = await addUploadImage(uploadData.image);
      setUploadData({ ...uploadData, image: url });
    }
    console.log(uploadData);
    if (
      uploadData.title === "" ||
      uploadData.tag === "" ||
      uploadData.keywords === "" ||
      uploadData.content === "" ||
      uploadData.content === "<p><br></p>" ||
      uploadData.image === ""
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
      await addTechNew(uploadData);
      swal({
        title: "Success",
        text: "Tech News added successfully",
        icon: "success",
      });
      navigate("/admin/techNews");
    } else {
      await addTechNew(uploadData);
      swal({
        title: "Success",
        text: "Tech News added successfully",
        icon: "success",
      });
      navigate("/admin/techNews ");
    }
  };
  const topics = [
    "",
    "Interview Experiences",
    "Latest Tech Innovations",
    "Miscellaneous",
  ];

  const divStyle = `flex w-full flex-col gap-2 text-[#202128] py-2`;

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
              Create A Tech News
            </h1>
            <div className="flex flex-col ">
              <div className="flex w-10/12 mx-auto items-center justify-between mt-8">
                <h1 className="text-left text-[white] text-base font-normal">
                  Your New Tech News
                </h1>
              </div>
            </div>
            <div className="flex flex-col w-10/12 mx-auto text-sm">
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
              <div className="w-full">
                <label htmlFor="title" className="text-white">
                  Keywords
                </label>
                <input
                  type="text"
                  name="title"
                  value={uploadData.keywords}
                  placeholder="Keywords"
                  className="w-full pl-2 h-10 rounded-[8px] mb-5"
                  onChange={(e) => {
                    setUploadData({
                      ...uploadData,
                      keywords: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="title" className="text-white">
                  Image
                </label>
                <div className="w-full p-2 rounded-md bg-white mt-2">
                  <Filebase64
                    multiple={false}
                    onDone={(file) => {
                      setUploadData({
                        ...uploadData,
                        image: file.base64,
                      });
                    }}
                  />
                </div>
              </div>

              <div className={divStyle}>
                <label className="text-white">Tags</label>
                <div class="relative inline-block w-full">
                  <select
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => {
                      setUploadData({
                        ...uploadData,
                        tag: e.target.value,
                      });
                    }}
                  >
                    {topics.map((topic) => (
                      <option value={topic}>{topic}</option>
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
                      placeholder="Company Name"
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
                <label className="text-white">Your Tech News</label>
                <div className=" bg-white mb-10">
                  <MarkdownEditor
                    value={uploadData.content}
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

export default CreateTechNews;
