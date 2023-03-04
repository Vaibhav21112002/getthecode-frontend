import React, { useEffect, useContext } from "react";
import { AdminNavbar, AdminTopBar } from "../../components";
import "../../assets/CSS/index.css";
import { useNavigate } from "react-router-dom";
import codeContext from "../../context/CodeContext";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import swal from "sweetalert";
import { useState } from "react";

const AdminBlogs = () => {
  const navigate = useNavigate();
  const { getBlogs, blogs, setLogin, deleteBlog } = useContext(codeContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setData(blogs);
  }, [blogs]);

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
      <tr className="text-[0.76rem] bg-gray-800">
        <th className="py-4 px-6 font-medium  text-gray-900 dark:text-white whitespace-nowrap">
          {index + 1}
        </th>
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 dark:text-white whitespace-nowrap hover:text-blue-600 dark:hover:text-blue-500 cursor-pointer"
          //redirect to new page
          onClick={() => {
            navigate(`/blogs/${item._id}`);
          }}
        >
          {item.title ? item.title : "Two Sum"}
        </th>
        {/* Edit Icon */}
        <th
          className="py-4 px-6 font-bold text-xl text-gray-900 dark:text-white whitespace-nowrap"
          onClick={() => {
            navigate(`/admin/blogs/${item._id}`);
          }}
        >
          <AiFillEdit className="cursor-pointer" />
        </th>

        <th
          className="py-4 px-6 font-bold text-xl text-gray-900 dark:text-white whitespace-nowrap"
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
                deleteBlog(item._id);
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
                  onClick={() => navigate("/admin/createBlog")}
                >
                  Upload{" "}
                </button>
              </div>

              <div className="py-8 w-full flex justify-center items-center text-[10px]">
                <div className="w-[90%]">
                  <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                            Edit
                          </th>
                          <th scope="col" className="py-3 px-6">
                            Delete
                          </th>
                        </tr>
                      </thead>
                      {data.length > 0 && (
                        <tbody>
                          {data.length &&
                            data.map((blog, index) => {
                              return (
                                <TableComponent
                                  key={index}
                                  item={blog}
                                  index={index}
                                />
                              );
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

export default AdminBlogs;
