import React, { useState, useEffect, useContext, useRef } from "react";
import { Navbar } from "../components";
import "../assets/CSS/index.css";
import { useNavigate } from "react-router-dom";
import Parser from "html-react-parser";
import codeContext from "../context/CodeContext";

const Blogs = () => {
  const [data, setData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Blogs");
  const { getBlogs, blogs } = useContext(codeContext);
  const [companies, setCompanies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(2);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const inputRef = useRef(null);
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setFilteredCompanies(companies);
    }
    setFilteredCompanies(
      companies.filter(
        (company) =>
          company.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      )
    );
  };

  const handleOptionClick = (value) => {
    setInputValue(value);
    setFilteredCompanies(companies);
    setData(
      blogs.filter(
        (blog) => blog.company.toLowerCase().indexOf(value.toLowerCase()) !== -1
      )
    );
    inputRef.current.blur();
  };

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    setData(blogs);
    if (data.length > 0) {
      let comp = [];
      data.map((blog) => {
        if (blog.tag === "Interview Experiences") {
          comp.push(blog.company.toLowerCase());
        }
      });
      let uniqueCompanies = comp.filter(
        (item, index) => comp.indexOf(item) === index
      );
      setCompanies(uniqueCompanies);
      setFilteredCompanies(companies);
    }
  }, [blogs]);

  const navigate = useNavigate();

  const handleTopicFilter = (topic) => {
    if (activeFilter === topic) return;
    if (topic !== "Interview Experiences") {
      setInputValue("");
    }
    setActiveFilter(topic);
    if (topic === "All Blogs") {
      setData(blogs);
    } else {
      const filteredBlogs = [];
      blogs.map((blog) => {
        if (blog.tag === topic) {
          filteredBlogs.push(blog);
        }
      });
      setData(filteredBlogs);
    }
  };

  const topics = [
    { title: "All Blogs" },
    { title: "Interview Experiences" },
    { title: "Latest Tech Innovations" },
    { title: "Miscellaneous" },
  ];

  const currentBlogs = data.slice(indexOfFirstBlog, indexOfLastBlog);
  console.log(currentBlogs);
  return (
    <div className="back">
      <Navbar />
      <div className="w-full flex bg-[#222629] z-0">
        <div className="w-full flex flex-col py-8 text-[white] px-20">
          <div className="py-1 flex justify-between">
            <h1
              className="
                            text-center text-[white] text-2xl font-bold px-4 py-12 mx-auto
                        "
            >
              The Digital Frontline - All the latest tech news at your
              fingertips
            </h1>
            <div className="flex justify-center items-center float-right">
              <div className="relative inline-block w-full">
                <select
                  value={activeFilter}
                  onChange={(e) => {
                    handleTopicFilter(e.target.value);
                  }}
                  className="block appearance-none w-full border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline text-black"
                >
                  {topics.map((topic) => (
                    <option value={topic.title} key={topic.title}>
                      {topic.title}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7l-5 5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {activeFilter === "Interview Experiences" && (
            <div className="company-input flex flex-col ease-in-out mb-12 justify-center items-center z-10">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                ref={inputRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    console.log(inputValue);
                    setFilteredCompanies(companies);
                    setData(
                      blogs.filter(
                        (blog) =>
                          blog.company
                            .toLowerCase()
                            ===inputValue
                      )
                    );
                    inputRef.current.blur();
                  }
                }}
                placeholder="Select a company"
                className="text-black w-[70%] h-[30px] text-center rounded-[8px]"
              />
              {isFocused && filteredCompanies.length > 0 && (
                <ul className="dropdown mt-2">
                  {filteredCompanies.map((company, index) => (
                    <li
                      className="cursor-pointer"
                      key={index}
                      onClick={() => handleOptionClick(company)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {company.slice(0, 1).toUpperCase()}
                      {company.slice(1, company.length)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <div className="py-1 flex flex-wrap">
            {currentBlogs.map((blog, index) => (
              <div
                key={blog._id}
                className="bg-white w-[29.6%] shadow-[rgb(233, 117, 0)] h-[64vh] ml-10 mb-10 rounded-[16px] cursor-pointer flex"
                onClick={() => navigate("/blogs/" + blog._id)}
              >
                <div className="flex flex-col w-full ml-6">
                  <div className="text-black w-full mt-6">
                    <h1 className="text-5xl">{blog.title}</h1>
                  </div>
                  <div className="text-black mt-6">
                    <div>{Parser(blog.keywords.slice(0, 150))}.....</div>
                  </div>
                  <div className="mt-6 mb-3">
                    (
                    <span className="text-sm text-gray-700">
                      #{blog.tag}
                      {blog.company &&
                        blog.tag === "Interview Experiences" &&
                        ":" + blog.company + " "}
                    </span>
                    ))
                  </div>
                </div>
                {(index + 1) % 3 === 0 ? <div className="w-full"></div> : null}
              </div>
            ))}
          </div>

          {Math.ceil(data.length / blogsPerPage) === 0 ? (
            <div>
              No Blogs with the selected filters
            </div>
          ) : (
            <div className="flex justify-center items-center mt-8">
              {
                <button
                  onClick={() => {
                    if (currentPage <= 1) return;
                    paginate(currentPage - 1);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
              }
              <div className="rounded-full h-10 w-10 mx-5 flex items-center justify-center bg-white text-black">{`${currentPage}/${Math.ceil(
                data.length / blogsPerPage
              )}`}</div>

              {
                <button
                  onClick={() => {
                    if (
                      currentBlogs.length < blogsPerPage ||
                      data.length <= blogsPerPage * currentPage
                    )
                      return;
                    paginate(currentPage + 1);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
