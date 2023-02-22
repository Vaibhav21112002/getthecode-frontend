import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "../../assets/CSS/index.css";
import { AdminTopBar, AdminNavbar } from "../../components";
import "react-quill/dist/quill.snow.css";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import codeContext from "../../context/CodeContext";

const EditBlog = () => {
  const navigate = useNavigate();
  const [editData, setEditData] = useState(undefined);
  const { id } = useParams();

  const { editBlog, getBlog, blog } = useContext(codeContext);
  useEffect(() => {
    getBlog(id);
  }, []);
  useEffect(() => {
    setEditData(blog[0]);
  }, [blog]);

  const handleUpload = () => {
    if (
      editData.title === "" ||
      editData.tag === "" ||
      editData.keywords === "" ||
      editData.content === "" ||
      editData.content === "<p><br></p>"
    ) {
      swal({
        title: "Error",
        text: "Please fill all the fields",
        icon: "error",
      });
      return;
    } else if (
      editData.tag === "Interview Experiences" &&
      editData.company === ""
    ) {
      swal({
        title: "Error",
        text: "Please fill the company name",
        icon: "error",
      });
      return;
    } else if (
      editData.company !== "" &&
      editData.tag !== "Interview Experiences"
    ) {
      setEditData({ ...editData, company: "" });
      editBlog(editData);
      swal({
        title: "Success",
        text: "Blog added successfully",
        icon: "success",
      });
      navigate("/admin/blogs");
    } else {
      swal({
        title: "Do you stil want to edit the blog ?",
        icon: "warning",
        buttons: true,
      }).then((res) => {
        if (res) {
          editBlog(id, editData);
          swal({
            title: "Success",
            text: "Blog edited successfully",
            icon: "success",
          });
          navigate("/admin/blogs");
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

  const topics = [
    "Interview Experiences",
    "Latest Tech Innovations",
    "Miscellaneous",
  ];

  const divStyle = `flex w-full flex-col gap-2 text-[#202128] py-2`;
  if (editData === undefined) {
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
              <div className="flex w-10/12 mx-auto items-center justify-between mt-8">
                <h1 className="text-left text-[white] text-base font-normal">
                 Edit Blog
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
              <div className="w-full">
                <label htmlFor="title" className="text-white">
                  Keywords
                </label>
                <input
                  type="text"
                  name="title"
                  value={editData.keywords}
                  placeholder="keywords"
                  className="w-full pl-2 h-10 rounded-[8px] mb-5"
                  onChange={(e) => {
                    setEditData({
                      ...editData,
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
                {editData.tag === "Interview Experiences" && (
                  <div className="w-full">
                    <label htmlFor="title" className="text-white">
                      Company name
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={editData.company}
                      placeholder="Company Name "
                      className="w-full pl-2 h-10 rounded-[8px] mb-5"
                      onChange={(e) => {
                        setEditData({
                          ...editData,
                          company: e.target.value,
                        });
                      }}
                    />
                  </div>
                )}
                <label className="text-white">Your Blog</label>
                <div className=" bg-white min-h-[200px] mb-10">
                  <ReactQuill
                    theme="snow"
                    value={editData.content}
                    placeholder="blog"
                    name="blog"
                    className="w-full bg-white"
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
                        content: e,
                      });
                    }}
                  />
                </div>
                <div>
                  <button
                    className="text-sm bg-[#E97500] px-4 py-2  mb-10 rounded-xl w-full text-white border-[#E97500] hover:shadow-2xl"
                    onClick={handleUpload}
                  >
                    Update
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

export default EditBlog;
