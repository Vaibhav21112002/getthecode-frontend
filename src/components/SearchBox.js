import React from "react";

const SearchBox = () => {
  return (
    <div className="pt-20 flex justify-between items-strech">
      <div>
        <p className="flex font-medium  flex text-4xl mt-0 mb-2 text-blue-600">
          /Programming/Arrays
        </p>
      </div>
      <div className="mb-3 xl:w-96">
        <input
          type="search"
          className="
        flex
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
          id="exampleSearch"
          placeholder="Search By Name"
        />
      </div>
    </div>
  );
};

export default SearchBox;
