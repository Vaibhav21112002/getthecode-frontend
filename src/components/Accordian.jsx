import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Accordian = ({ title, description }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div className="w-full h-[2.5rem] rounded-lg bg-[#25272E] flex items-center px-4 font-bold">
                <h1 className="w-full flex items-center font-bold text-sm">
                    {title}
                </h1>
                <div className="w-full flex items-center justify-end">
                    {open ? (
                        <IoIosArrowUp
                            className="text-[#BDA9A9] cursor-pointer"
                            onClick={() => setOpen(!open)}
                        />
                    ) : (
                        <IoIosArrowDown
                            className="text-[#BDA9A9] cursor-pointer"
                            onClick={() => setOpen(!open)}
                        />
                    )}
                </div>
            </div>
            {open && (
                <div className="w-full min-h-[5rem] rounded-lg bg-[#25272E] flex px-4 font-bold mt-2">
                    <h1 className="w-full text-sm py-4" >{description}</h1>
                </div>
            )}
        </div>
    );
};

export default Accordian;
