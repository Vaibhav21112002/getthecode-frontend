import React from "react";
import {
	Home,
	Programming,
	Blogs,
	Articles,
	Question,
	Blog,
	MCQ,
	// Example
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
					<Route path="/programming/:id" element={<Question />} />
					<Route path="/admin" element={<Admin />} />
					<Route
						path="/admin/programming"
						element={<AdminProgramming_2 />}
					/>
					<Route path="/admin/blogs" element={<AdminBlogs />} />
					<Route path="/admin/createBlog" element={<CreateBlog />} />
					<Route path="/admin/blogs/:id" element={<EditBlog />} />
					<Route path="/admin/articles" element={<AdminArticles />} />
					<Route path="/admin/mcqs" element={<AdminMcq />} />
					<Route path="/admin/profile" element={<Profile />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
