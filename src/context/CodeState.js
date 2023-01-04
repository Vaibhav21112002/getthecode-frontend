import React, { useState } from "react";
import CodeContext from "./CodeContext";
import api from "../api";

const CodeState = (props) => {
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState({});
    const [loading, setLoading] = useState(false);

    const getQuestions = async () => {
        try {
            setLoading(true);
            const res = await api.get("/problems");
            setQuestions(res.data);
            console.log(res.data);
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
            // eslint-disable-next-line
            const res = await api.put(`/problems/${id}`, question);
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
                    loading,
                    getQuestions,
                    getQuestion,
                    addQuestion,
                    editQuestion,
                }}
            >
                {props.children}
            </CodeContext.Provider>
        </div>
    );
};

export default CodeState;
