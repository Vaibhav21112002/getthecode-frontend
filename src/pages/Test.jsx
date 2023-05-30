import React, { useState } from "react";

import {
  topics,
  companies_new as options,
  pagination,
} from "../assets/Constants";

const UserMultiSelect = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    const selectedIndex = selectedItems.indexOf(item);
    let newSelectedItems = [];

    if (selectedIndex === -1) {
      newSelectedItems = [...selectedItems, item];
    } else {
      newSelectedItems = [
        ...selectedItems.slice(0, selectedIndex),
        ...selectedItems.slice(selectedIndex + 1),
      ];
    }

    setSelectedItems(newSelectedItems);
  };

  return (
    <div className="relative">
      <div className="border p-2 rounded cursor-pointer" onClick={handleToggle} >
        <ul className="text-sm">
          {selectedItems.length > 0 ? (
            <>
              <input type="checkbox" checked={true} />

              {` ${selectedItems.length} selected`}
            </>
          ) : (
            <span className="text-gray-500">Select items...</span>
          )}
        </ul>
      </div>

      {isOpen && (
        <div className="absolute mt-2 bg-white border rounded shadow-md">
          {options.map((item) => (
            <div
              key={item}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleItemClick(item.value)}
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item.value)}
                readOnly
              />
              <span className="ml-2">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMultiSelect;
