import React from "react";

const questions = [
  {
    id : 1,
    title: "Maximum Sum Subarray",
    solution: "",
    difficulty: "Easy",
    score: 20,
  },
  {
    id : 2,
    title: "Number of Vowels in Array",
    solution: "",
    difficulty: "Medium",
    score: 30,
  },
];

const QuestionList = () => {
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-white-500 dark:text-white">
        <thead className="text-lg text-white bg-blue-700 dark:bg-blue-700 dark:text-white-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Title
            </th>
            <th scope="col" className="py-3 px-6">
              Solution
            </th>
            <th scope="col" className="py-3 px-6">
              Difficulty
            </th>
            <th scope="col" className="py-3 px-6">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => {
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key = {question.id}>
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {question.title}
              </th>
              <td className="py-4 px-6">{question.solution}</td>
              <td className="py-4 px-6">{question.difficulty}</td>
              <td className="py-4 px-6">{question.score}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;
