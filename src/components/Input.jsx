// EditableTextField.js
import React, { useEffect, useState } from "react";
import pen from "../assets/pen.svg";

const EditableTextField = ({
  label,
  initialValue,
  onFieldUpdate,
  width,
  borderWidth,
}) => {
  const [text, setText] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    
    setText(initialValue);
  }, [initialValue]);
  const handleDoubleClick = () => {
    setIsEditing(true);
    setIsFocused(true);
  };

  const handleChange = (e) => {
    setText(e.target.value);
    onFieldUpdate(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className="relative" style={{ width: width, height: "60px" }}>
      <label
        htmlFor="username"
        className={`block text-[#00000099] text-[17px] leading-[20px] tracking-[0.25px] absolute transition-all duration-300 ${
          isFocused || text
            ? "top-[-15px] right-2 text-[#00000099]"
            : " top-3  p-4 transform -translate-y-full"
        }`}>
        {label}
      </label>

      {isEditing ? (
        <input
          type="text"
          id="username"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`absolute inset-0 focus:outline-none ${
            isEditing
              ? `border ${
                  isFocused ? "border-[#28CC9E4D] border-2 rounded-[10px]" : ""
                }  bg-transparent`
              : ""
          }`}
          autoFocus
        />
      ) : (
        <span
          onClick={handleDoubleClick}
          className={`inline-block ${
            isEditing ? "hidden" : ""
          } absolute bottom-2 py-3 px-4 border-b-2 w-[${borderWidth}] border-[#28CC9E] cursor-pointer`}>
          {text}
        </span>
      )}
      <img
        src={pen}
        alt="Edit"
        className={`absolute left-0 bottom-10  ml-1 cursor-pointer ${
          isEditing ? "hidden" : "absolute bottom-4"
        }`}
        onClick={handleDoubleClick}
      />
    </div>
  );
};

export default EditableTextField;
