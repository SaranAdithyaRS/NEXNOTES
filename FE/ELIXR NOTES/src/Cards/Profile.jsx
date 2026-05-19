import React from 'react'

const ProfileInfo = ({ UserInfo, onLogout }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-zinc-900 text-white text-sm font-semibold ring-4 ring-zinc-100">
        {getInitials(UserInfo?.name || "U")}
      </div>

      <div className="hidden sm:block">
        <p className="text-sm font-semibold text-zinc-900 leading-tight">{UserInfo?.name || "U"}</p>
        <button
          className="text-xs text-zinc-500 hover:text-zinc-950 transition"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfileInfo
