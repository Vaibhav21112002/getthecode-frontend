import React, { useState } from "react";
import CodeContext from "./CodeContext";
import api from "../api";

const CodeState = (props) => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({});

  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({});

  const [mcqs, setMcqs] = useState([]);
  const [mcq, setMcq] = useState({});

  const [loading, setLoading] = useState(false);

  const getQuestions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/problems");
      setQuestions(res.data);
      // console.log(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const getQuestion = async (id) => {
    try {
      setLoading(true);
      const res = await api.get(`/problems/${id}`);
      setQuestion(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const addQuestion = async (question) => {
    try {
      setLoading(true);
      const res = await api.post("/problems", question);
      setQuestions([...questions, res.data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const editQuestion = async (id, question) => {
    try {
      setLoading(true);
      const res = await api.put(`/problems/${id}`, question);
      setQuestions(
        questions.map((question) => (question._id === id ? res.data : question))
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const getBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/blogs");
      setBlogs(res.data);
      // console.log(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const getBlog = async (id) => {
    try {
      setLoading(true);
      const res = await api.get(`/blogs/${id}`);
      setBlog(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const addBlog = async (blog) => {
    try {
      setLoading(true);
      const res = await api.post("/blogs", blog);
      setBlogs([...blogs, res.data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const editBlog = async (id, question) => {
    try {
      setLoading(true);
      const res = await api.put(`/blogs/${id}`, question);
      setBlogs(blogs.map((blog) => (blog._id === id ? res.data : blog)));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const getMcqs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/mcqs");
      setMcqs(res.data);
      // console.log(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const getMcq = async (id) => {
    try {
      setLoading(true);
      const res = await api.get(`/mcqs/${id}`);
      setMcq(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const addMcq = async (mcq) => {
    try {
      setLoading(true);
      const res = await api.post("/mcqs", mcq);
      setMcqs([...blogs, res.data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const editMcq = async (id, mcq) => {
    try {
      setLoading(true);
      const res = await api.put(`/mcqs/${id}`, mcq);
      setMcqs(blogs.map((blog) => (blog._id === id ? res.data : blog)));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <div>
      <CodeContext.Provider
        value={{
          questions,
          question,
          blog,
          blogs,
          mcq,
          mcqs,
          loading,
          getQuestions,
          getQuestion,
          addQuestion,
          editQuestion,
          getBlogs,
          getBlog,
          addBlog,
          editBlog,
          getMcqs,
          getMcq,
          addMcq,
          editMcq,
        }}
      >
        {props.children}
      </CodeContext.Provider>
    </div>
  );
};

export default CodeState;
