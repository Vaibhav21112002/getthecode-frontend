import React from "react";

const Card = ({ heading }) => {
  return (
    <div className="w-5/6 justify-center">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <h5 className="text-gray-900 text-4xl leading-tight font-large mb-2">
          {heading}
        </h5>
      </div>
    </div>
  );
};

export default Card;
