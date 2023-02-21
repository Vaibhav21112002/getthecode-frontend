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

	const addUploadImage = async (image) => {
		console.log(image);
		const res = await api.post("/cloudinary/upload", {
			image: image,
		});
		console.log(res.data.url);
		return res.data.url;
	};

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
				questions.map((question) =>
					question._id === id ? res.data : question,
				),
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
			console.log(res.data);
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
			setMcqs([...mcqs, res.data]);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const editMcq = async (id, mcq) => {
		try {
			setLoading(true);
			const res = await api.put(`/mcqs/${id}`, mcq);
			setMcqs(mcqs.map((mcq) => (mcq._id === id ? res.data : mcq)));
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};

	const deleteMcq = async (id) => {
		try {
			setLoading(true);
			await api.delete(`/mcqs/${id}`);
			setMcqs(mcqs.filter((mcq) => mcq._id !== id));
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
					addUploadImage,
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
					deleteMcq,
				}}
			>
				{props.children}
			</CodeContext.Provider>
		</div>
	);
};

export default CodeState;
