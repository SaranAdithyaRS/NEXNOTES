import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="flex w-full md:max-w-md items-center px-4 bg-zinc-100/90 border border-zinc-200 rounded-xl focus-within:bg-white focus-within:border-zinc-400 focus-within:ring-4 focus-within:ring-zinc-100 transition">
      <input
        type="text"
        placeholder="Search notes"
        className="w-full text-sm bg-transparent py-3 outline-none text-zinc-800 placeholder:text-zinc-400"
        value={value}
        onChange={onChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSearch();
          }
        }}
      />

      {value && (
        <IoMdClose
          className="text-zinc-400 text-xl cursor-pointer mr-3 hover:text-zinc-900 transition"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="text-zinc-500 cursor-pointer hover:text-zinc-950 transition"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
