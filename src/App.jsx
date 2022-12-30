import React from "react";
import { Home } from "./pages";
import {
    Admin,
    AdminProgramming,
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
                    <Route path="/admin" element={<Admin />} />
                    <Route
                        path="/admin/programming"
                        element={<AdminProgramming />}
                    />
                    <Route path="/admin/blogs" element={<AdminBlogs />} />
                    <Route path="/admin/articles" element={<AdminArticles />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
