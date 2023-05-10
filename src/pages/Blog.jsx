import React, { useState, useEffect, useContext } from "react";
import { Navbar, Footer } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/CSS/index.css";
import Parser from "html-react-parser";
import codeContext from "../context/CodeContext";

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(undefined);
  const { getBlog, getBlogs, blog, blogs } = useContext(codeContext);
  const [allBlogs, setAllBlogs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const usrToken = localStorage.getItem("token");
    const adminToken = localStorage.getItem("admin-token");

    if ((usrToken === undefined || usrToken === null)  && (adminToken === undefined || adminToken === null)) {
      navigate("/");
      return;
    }
    getBlogs(usrToken||adminToken);
    getBlog(id,usrToken||adminToken);
  }, []);
  useEffect(() => {
    setData(blog[0]);
    setAllBlogs(blogs);
    console.log(blog);
  }, [blog]);

  if (data === undefined) {
    return <div>Loading.....</div>;
  }
  return (
    <div className="back">
      <Navbar />
      <div className="w-full flex bg-[#25272E]">
        <div className="w-12/12 flex flex-col py-8 text-[white] px-20">
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
          <div className = "w-full flex justify-center my-8">
            <img src={data.image} alt="blog" className="w-64" />
          </div>
          <div className="ml-1 mt-10">{Parser(data.content)}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
