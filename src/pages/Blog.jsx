import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../components";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/CSS/index.css";
import CodeContext from "../context/CodeContext";
import Void from "../assets/Images/Void.svg";
import Modal from "react-awesome-modal";
import Editor from "@monaco-editor/react";
import { AiOutlineClose } from "react-icons/ai";
import load from "../assets/Images/question_mark.png";
import { IoMdReturnRight } from "react-icons/io";
import Parser from "html-react-parser";
import data from "../assets/data.json";
import codeContext from "../context/CodeContext";

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(undefined);
  const { getBlog, getBlogs, blog, blogs } = useContext(codeContext);
  const [allBlogs, setAllBlogs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getBlog(id);
    getBlogs();
  }, []);
  useEffect(() => {
    setData(blog[0]);
    setAllBlogs(blogs);
  }, [blog]);

  if (data === undefined) {
    return <div>Loading.....</div>;
  }
  return (
    <div className="back">
      <Navbar />
      <div className="w-full flex bg-[#25272E]">
        <div className="w-9/12 flex flex-col py-8 text-[white] px-20">
          <h1 className="text-7xl my-10 text-center font-bold text-[white]">
            {data.title ? data.title : "First Blog"}
          </h1>

          <div className="mb-3 text-center">
            
              <span className=" text-sm text-white">
                #{data.tag}
                {data.company &&
                  data.tag === "Interview Experiences" &&
                  ":" + data.company + " "}
              </span>
          </div>
          <div className="ml-1 mt-10">{Parser(data.content)}</div>
        </div>
        <div className="min-h-[100vh] border-r"></div>
        <div className="w-3/12 flex flex-col gap-4 p-4 mt-20">
          <div style={{ position: "", width: "100%" }}>
            <div
              className="bg-[#25272E] overflow-scroll rounded-xl py-4 mb-5"
              style={{ width: "90%" }}
            >
              <h1 className="text-base font-bold text-center text-[white] h-10">
                Users also read these Blogs
              </h1>
              <div className="overflow-scroll">

              {allBlogs.map((item) => {
                if (data.tag=== item.tag&&data._id!==item._id) {
                  return (
                    <div className="">
                      <div
                        className="bg-white ml-10 mb-10 overflow-scroll rounded-[16px] cursor-pointer flex"
                        onClick={() => navigate("/blogs/" + item.id)}
                      >
                        <div className="flex flex-col w-full ml-6">
                          <div className=" text-black w-full mt-2 ">
                            <h1 className="text-3xl">{item.title}</h1>
                          </div>
                          <div className=" text-black mt-2">
                            <div>
                              {Parser(data.content.slice(0, 100))}........
                            </div>
                          </div>
                          <div className="mb-1">
                           
                              <span className=" text-sm text-gray-700">
                                #{item.tag}
                                {item.company &&
                                  item.tag === "Interview Experiences" &&
                                  ":" + item.company + " "}
                              </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              </div>
              {/* <div>
                <div
                  className="bg-white ml-10 mb-10 rounded-[16px] cursor-pointer flex"
                  onClick={() => navigate("/blogs/" + blog.id)}
                >
                  <div className="flex flex-col w-full ml-6">
                    <div className=" text-black w-full mt-2 ">
                      <h1 className="text-3xl">{blog.title}</h1>
                    </div>
                    <div className=" text-black mt-2">
                      <div>{Parser(data.content.slice(0, 100))}........</div>
                    </div>
                    <div className="mb-1">
                      {blog.tags.map((topic) => (
                        <span className=" text-sm text-gray-700">
                          #{topic}
                          {blog.company &&
                            topic === "Interview Experiences" &&
                            ":" + blog.company + " "}
                        </span>
                      ))}
                    </div>
                  </div>
                </div> 
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
