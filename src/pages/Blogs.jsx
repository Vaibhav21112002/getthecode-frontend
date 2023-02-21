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

  const TopicCard = ({ title }) => {
    return (
      <div
        className="sm:w-[16rem] w-[10rem] text-[white] my-5 flex justify-center items-center sm:px-6 px-4 py-2 rounded-lg shadow-xl cursor-pointer bg-[#E97500] border-[#E97500] border hover:border-[#E97500] hover:bg-[#202128] hover:text-[white]"
        onClick={() => handleTopicFilter(title)}
      >
        <h1 className="sm:text-sm text-xs text-center  hover:text-[white]">
          {title}
        </h1>
      </div>
    );
  };

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
              <select
                value={activeFilter}
                className=" h-[30%] rounded-lg border-[#E97500] border bg-[#E97500] text-white"
                onChange={(e) => {
                  handleTopicFilter(e.target.value);
                }}
              >
                {topics.map((topic) => (
                  <option value={topic.title} key={topic.title}>
                    {topic.title}
                  </option>
                ))}
              </select>
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
            {data.map((blog, index) => (
              <div
                key={blog._id}
                className="bg-white w-[29.6%] h-[64vh] ml-10 mb-10 rounded-[16px] cursor-pointer flex"
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
        </div>
      </div>
    </div>
  );
};

export default Blogs;
