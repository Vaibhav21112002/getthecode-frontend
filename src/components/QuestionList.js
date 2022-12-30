import React from "react";

const questions = [
  {
    id: 1,
    title: "Maximum Sum Subarray",
    difficulty: "Easy",
    score: 20,
  },
  {
    id: 2,
    title: "Number of Vowels in Array",
    difficulty: "Medium",
    score: 30,
  },
];

const QuestionList = () => {
  return (
    <div className="pt-20 overflow-x-auto relative">
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
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={question.id}
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {question.title}
                </th>
                <td className="py-4 px-6">
                  <svg
                    class="h-8 w-8 text-black"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />{" "}
                    <line x1="13" y1="8" x2="15" y2="8" />{" "}
                    <line x1="13" y1="12" x2="15" y2="12" />
                  </svg>
                </td>
                <td className="py-4 px-6">{question.difficulty}</td>
                <td className="py-4 px-6">{question.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;
