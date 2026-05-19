import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import TagInput from "../../components/Input/TagInput";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({
  noteData,
  type,
  onClose,
  getAllNotes,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/addnotes", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        getAllNotes();
        showToastMessage?.("Note added successfully", "success");
        onClose();
      }
    } catch (error) {
      showToastMessage?.(
        error.response?.data?.message || "Error adding note",
        "error"
      );
    }
  };

  const editNote = async () => {
    try {
      const response = await axiosInstance.put(`/editNotes/${noteData._id}`, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        getAllNotes();
        showToastMessage?.("Note updated successfully", "success");
        onClose();
      }
    } catch (error) {
      showToastMessage?.(
        error.response?.data?.message || "Error updating note",
        "error"
      );
    }
  };

  const handleSubmit = () => {
    if (!title) {
      setError("Title is required");
      return;
    }

    if (!content) {
      setError("Content is required");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-zinc-100 transition"
        onClick={onClose}
      >
        <MdClose className="text-xl text-zinc-500" />
      </button>

      <div className="mb-6 pr-9">
        <p className="text-sm font-semibold text-zinc-500">
          {type === "edit" ? "Refine note" : "New note"}
        </p>
        <h2 className="text-2xl font-semibold text-zinc-950 mt-1">
          {type === "edit" ? "Edit your note" : "Capture a thought"}
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl font-semibold text-zinc-950 outline-none bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 placeholder:text-zinc-300 focus:bg-white focus:border-zinc-500 focus:ring-4 focus:ring-zinc-100 transition"
          placeholder="Meeting notes"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          className="text-sm leading-6 text-zinc-900 outline-none bg-zinc-50 border border-zinc-200 p-4 rounded-xl resize-none placeholder:text-zinc-400 focus:bg-white focus:border-zinc-500 focus:ring-4 focus:ring-zinc-100 transition"
          placeholder="Write the details here..."
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <div className="text-red-500 text-sm mt-3">{error}</div>}

      <button className="btn-primary font-medium mt-5 p-3" onClick={handleSubmit}>
        {type === "edit" ? "Update note" : "Add note"}
      </button>
    </div>
  );
};

export default AddEditNotes;
