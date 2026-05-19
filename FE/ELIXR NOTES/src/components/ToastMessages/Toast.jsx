import React, { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { LuCheck } from "react-icons/lu";

const Toast = ({ isShown, message, type, onClose }) => {

  useEffect(() => {
    if (isShown) {
      const timer = setTimeout(() => {
        onClose(); // 🔥 hide toast automatically
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isShown, onClose]);

  return (
    <div
      className={`fixed top-20 right-6 z-50 transition-all duration-300 ${
        isShown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <div
        className={`min-w-52 bg-white border border-zinc-200 shadow-2xl shadow-zinc-300/60 rounded-xl relative overflow-hidden 
        after:content-[''] after:w-[5px] after:h-full 
        ${type === "error" || type === "delete" ? "after:bg-red-500" : "after:bg-green-500"} 
        after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "error" || type === "delete" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {type === "error" || type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>

          <p className="text-sm text-zinc-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
