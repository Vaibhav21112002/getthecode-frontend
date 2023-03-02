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
	Test
} from "./pages";
import {
	Admin,
	AdminProgramming_2,
	AdminBlogs,
	AdminMcq,
	AdminArticles,
	CreateBlog,
	EditBlog,
	Profile,
	AdminSql,
	CreateSql,
	EditSql
} from "./pages/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/programming" element={<Programming />} />
					<Route path="/blogs" element={<Blogs />} />
					<Route path="/mcqs" element={<MCQ />} />
					<Route path="/blogs/:id" element={<Blog />} />
					<Route path="/articles" element={<Articles />} />
					<Route path="/sql" element={<SqlQuestions />} />
					<Route path="/sql/:id" element={<SqlQuestion />} />
					<Route path="/Table" element={<Table />} />
					<Route path="/programming/:id" element={<Question />} />
					<Route path="/admin" element={<Admin />} />
					<Route
						path="/admin/programming"
						element={<AdminProgramming_2 />}
					/>
					<Route path="/admin/blogs" element={<AdminBlogs />} />
					<Route path="/admin/createBlog" element={<CreateBlog />} />
					<Route path="/admin/blogs/:id" element={<EditBlog />} />
					<Route path="/admin/sql/:id" element={<EditSql />} />
					<Route path="/admin/articles" element={<AdminArticles />} />
					<Route path="/admin/mcqs" element={<AdminMcq />} />
					<Route path="/admin/sql" element={<AdminSql />} />
					<Route path="/admin/createSql" element={<CreateSql />} />
					<Route path="/admin/profile" element={<Profile />} />
					<Route path="/test" element={<Test />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
