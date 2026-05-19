import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {

  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-white border border-zinc-200 px-5 rounded-lg mb-4 focus-within:border-zinc-500 focus-within:ring-4 focus-within:ring-zinc-100 transition">

      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none text-zinc-900 placeholder:text-zinc-400"
      />

      <button
        type="button"
        onClick={toggleShowPassword}
        className="text-zinc-500 hover:text-zinc-950 text-xl transition"
      >
        {isShowPassword ? <FaRegEye />:<FaRegEyeSlash />}
      </button>

    </div>
  );
};

export default PasswordInput;
