import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 bg-zinc-100 border border-zinc-200 text-xs text-zinc-700 px-3 py-1.5 rounded-full"
            >
              #{tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-zinc-400 hover:text-zinc-950 transition"
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div>
        <div className="flex items-center gap-4 mt-3">
          <input
            type="text"
            value={inputValue}
            className="w-full text-sm bg-white border border-zinc-200 px-4 py-2.5 rounded-lg outline-none text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-4 focus:ring-zinc-100 transition"
            placeholder="Add tags"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-950 hover:bg-zinc-800 transition-colors shrink-0"
            onClick={addNewTag}
          >
            <MdAdd className="text-2xl text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagInput;
