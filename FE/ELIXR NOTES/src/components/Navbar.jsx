import React from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from '../Cards/Profile'
import SearchBar from './SearchBar/SearchBar'
import { MdOutlineStickyNote2 } from 'react-icons/md'

const Navbar = ({
  UserInfo,
  searchQuery,
  onSearchChange,
  handleSearch,
  onClearSearch,
}) => {
  const navigate = useNavigate()

  const onLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-4 px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3 min-w-fit">
          <div className="w-10 h-10 rounded-lg bg-zinc-950 text-white flex items-center justify-center shadow-sm">
            <MdOutlineStickyNote2 className="text-2xl" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-zinc-950 leading-tight">
              ELIXR Notes
            </h2>
            <p className="hidden sm:block text-xs text-zinc-500">
              Capture, pin and find your ideas
            </p>
          </div>
        </div>

        {onSearchChange && (
          <div className="order-3 md:order-2 w-full md:w-auto md:flex-1 md:flex md:justify-center">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => onSearchChange(target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
          </div>
        )}

        {UserInfo && (
          <div className="order-2 md:order-3">
            <Profile UserInfo={UserInfo} onLogout={onLogout} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
