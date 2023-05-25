import React from "react";
import {
	Home,
	Programming,
	Blogs,
	Articles,
	Question,
	Blog,
	MCQ,
	Table,
	SqlQuestion,
	SqlQuestions,
	Test,
	Login,
	TechNews,
	TechNew,
} from "./pages";
import {
	Admin,
	AdminProgramming_2,
	AdminBlogs,
	AdminTechNews,
	AdminMcq,
	AdminArticles,
	CreateBlog,
	EditBlog,
	Profile,
	AdminSql,
	CreateSql,
	EditSql,
	CreateTechNews,
	EditTechNews,
} from "./pages/Admin";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/programming/:topic" element={<Programming />} />
					<Route path="/blogs" element={<Blogs />} />
					<Route path="/mcqs" element={<MCQ />} />
					<Route path="/blogs/:id" element={<Blog />} />
					<Route path="/articles" element={<Articles />} />
					<Route path="/sql" element={<SqlQuestions />} />
					<Route path="/sql/:id" element={<SqlQuestion />} />
					<Route path="/Table" element={<Table />} />
					<Route path="/question/:id" element={<Question />} />
					<Route path="/admin/:id" element={<Admin />} />
					<Route path="/login" element={<Login />} />
					<Route path="/technews" element={<TechNews />} />
					<Route path="/technews/:id" element={<TechNew />} />
					<Route path="/admin" element={<Navigate to="/admin/q1w2e3r4t528032023" />} />
					<Route path="/technews/q1w2e3r4t528032023" element={<TechNew />} />
					<Route path="/admin/programming" element={<AdminProgramming_2 />} />
					<Route path="/admin/blogs" element={<AdminBlogs />} />
					<Route path="/admin/createBlog" element={<CreateBlog />} />
					<Route path="/admin/blogs/:id" element={<EditBlog />} />
					<Route path="/admin/sql/:id" element={<EditSql />} />
					<Route path="/admin/articles" element={<AdminArticles />} />
					<Route path="/admin/mcqs" element={<AdminMcq />} />
					<Route path="/admin/sql" element={<AdminSql />} />
					<Route path="/admin/createSql" element={<CreateSql />} />
					<Route path="/admin/profile" element={<Profile />} />
					<Route path="/admin/technews" element={<AdminTechNews />} />
					<Route
						path="/admin/createTechNews"
						element={<CreateTechNews />}
					/>
					<Route
						path="/admin/technews/:id"
						element={<EditTechNews />}
					/>
					<Route path="/test" element={<Test />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
