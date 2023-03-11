import React, { useState } from "react";
import CodeContext from "./CodeContext";
import api from "../api";

const CodeState = (props) => {
	const [questions, setQuestions] = useState([]);
	const [question, setQuestion] = useState({});

	const [blogs, setBlogs] = useState([]);
	const [blog, setBlog] = useState({});

	const [techNews, setTechNews] = useState([]);
	const [techNew, setTechNew] = useState({});

	const [mcqs, setMcqs] = useState([]);
	const [mcq, setMcq] = useState({});

	const [sqls, setSqls] = useState([]);
	const [sql, setSql] = useState({});

	const [loading, setLoading] = useState(false);
	const [login, setLogin] = useState(false);

	const addUploadImage = async (image) => {
		const res = await api.post("/cloudinary/upload", {
			image: image,
		});
		return res.data.url;
	};

	const contactForm = async (data) => {
		try {
			setLoading(true);
			const res = await api.post("/contact", data);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};

	const getQuestions = async () => {
		try {
			setLoading(true);
			const res = await api.get("/problems");
			setQuestions(res.data);
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

	const deleteQuestion = async (id) => {
		try {
			setLoading(true);
			await api.delete(`/problems/${id}`);
			setQuestions(questions.filter((question) => question._id !== id));
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

	const deleteBlog = async (id) => {
		try {
			setLoading(true);
			await api.delete(`/blogs/${id}`);
			setBlogs(blogs.filter((blog) => blog._id !== id));
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};

	const getTechNews = async () => {
		try {
			setLoading(true);
			const res = await api.get("/technews");
			setTechNews(res.data);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};

	const getTechNew = async (id) => {
		try {
			setLoading(true);
			const res = await api.get(`/technews/${id}`);
			setTechNew(res.data);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};

	const addTechNew = async (techNew) => {
		try {
			setLoading(true);
			const res = await api.post("/technews", techNew);
			setTechNews([...techNews, res.data]);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};

	const editTechNew = async (id, techNew) => {
		try {
			setLoading(true);
			const res = await api.put(`/technews/${id}`, techNew);
			setTechNews(
				techNews.map((techNew) =>
					techNew._id === id ? res.data : techNew,
				),
			);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};

	const deleteTechNews = async (id) => {
		try {
			setLoading(true);
			await api.delete(`/technews/${id}`);
			setTechNews(techNews.filter((techNew) => techNew._id !== id));
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

	const getSqls = async () => {
		try {
			setLoading(true);
			const res = await api.get("/sql");
			setSqls(res.data);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};
	const getSql = async (id) => {
		try {
			setLoading(true);
			const res = await api.get(`/sql/${id}`);
			setSql(res.data);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};
	const addSql = async (question) => {
		try {
			setLoading(true);
			const res = await api.post("/sql", question);
			setSqls([...sqls, res.data]);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};

	const editSql = async (id, question) => {
		try {
			setLoading(true);
			const res = await api.put(`/sql/${id}`, question);
			setSqls(
				sqls.map((question) =>
					question._id === id ? res.data : question,
				),
			);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};
	const deleteSql = async (id) => {
		try {
			setLoading(true);
			await api.delete(`/sql/${id}`);
			setSqls(questions.filter((sql) => sql._id !== id));
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
					techNews,
					techNew,
					mcq,
					mcqs,
					sqls,
					sql,
					loading,
					login,
					setLogin,
					contactForm,
					addUploadImage,
					getQuestions,
					getQuestion,
					addQuestion,
					editQuestion,
					deleteQuestion,
					getBlogs,
					getBlog,
					addBlog,
					editBlog,
					deleteBlog,
					getTechNews,
					getTechNew,
					addTechNew,
					editTechNew,
					deleteTechNews,
					getMcqs,
					getMcq,
					addMcq,
					editMcq,
					deleteMcq,
					getSqls,
					getSql,
					addSql,
					editSql,
					deleteSql,
				}}
			>
				{props.children}
			</CodeContext.Provider>
		</div>
	);
};

export default CodeState;
