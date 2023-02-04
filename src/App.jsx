import React from "react";
import { Home, Programming, Blogs, Articles, Question } from "./pages";
import {
    Admin,
    AdminProgramming_2,
    AdminBlogs,
    AdminArticles,
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
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/programming/:id" element={<Question />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/programming" element={<AdminProgramming_2 />} />
                    <Route path="/admin/blogs" element={<AdminBlogs />} />
                    <Route path="/admin/articles" element={<AdminArticles />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
