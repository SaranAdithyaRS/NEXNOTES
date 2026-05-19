import React from "react";
import { MdOutlinePushPin, MdPushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div
      className={`group border rounded-xl p-5 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/80 transition-all ease-in-out ${
        isPinned ? "border-zinc-950 bg-zinc-50" : "border-zinc-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h6 className="text-base font-semibold text-zinc-950 leading-snug truncate">{title}</h6>
          <span className="text-xs text-zinc-500">{moment(date).format("DD MMM YYYY")}</span>
        </div>

        {isPinned ? (
          <MdPushPin
            className="icon-btn !text-zinc-950 !bg-zinc-200 !rounded-lg !p-1 !ring-1 !ring-zinc-300 shrink-0"
            onClick={onPinNote}
          />
        ) : (
          <MdOutlinePushPin
            className="icon-btn text-zinc-400 bg-zinc-50 rounded-lg p-1 ring-1 ring-zinc-200 shrink-0"
            onClick={onPinNote}
          />
        )}
      </div>

      <p className="mt-4 min-h-12 text-sm leading-6 text-zinc-600">{content?.slice(0, 120)}</p>

      <div className="flex items-end justify-between gap-3 mt-5">
        <div className="flex flex-wrap gap-2 text-xs text-zinc-500">
          {tags.map((item) => (
            <span key={item} className="bg-zinc-100 border border-zinc-200 rounded-full px-2 py-1">
              #{item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn bg-zinc-50 ring-1 ring-zinc-200 rounded-lg p-1 hover:text-zinc-950"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn bg-zinc-50 ring-1 ring-zinc-200 rounded-lg p-1 hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
