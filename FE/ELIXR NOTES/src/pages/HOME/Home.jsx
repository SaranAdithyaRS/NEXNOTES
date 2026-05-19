import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import NoteCard from '../../Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import Modal from 'react-modal';
import AddEditNotes from './AddEditNotes';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessages/Toast';

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [UserInfo, setUserInfo] = useState(null);
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const isFirstSearchRender = useRef(true);

  const [showToast, setShowToast] = useState({
    isShown: false,
    message: '',
    type: 'success',
  });

  const showToastMessage = (message, type = 'add') => {
    setShowToast({
      isShown: true,
      message,
      type,
    });
  };

  const closeToast = () => {
    setShowToast({
      isShown: false,
      message: '',
      type: 'success',
    });
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/profile');

      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      showToastMessage(
        error.response?.data?.message || 'Error fetching profile',
        'error'
      );

      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/getNotes');

      if (response.data?.notes) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.log('Error fetching notes:', error.response?.data?.message);
      showToastMessage(
        error.response?.data?.message || 'Error fetching notes',
        'error'
      );
    }
  };

  const searchNotes = async (query) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      await getAllNotes();
      return;
    }

    try {
      const response = await axiosInstance.get('/searchNotes', {
        params: { query: trimmedQuery },
      });

      if (response.data?.notes) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.log('Error searching notes:', error.response?.data?.message);
      showToastMessage(
        error.response?.data?.message || 'Error searching notes',
        'error'
      );
    }
  };

  const deleteNote = async (note) => {
    try {
      await axiosInstance.delete(`/deleteNotes/${note._id}`);

      showToastMessage('Note deleted successfully', 'delete');

      getAllNotes();
    } catch (error) {
      showToastMessage(
        error.response?.data?.message || 'Error deleting note',
        'error'
      );
    }
  };

  const togglePinNote = async (note) => {
    try {
      const response = await axiosInstance.put(`/togglePin/${note._id}`);

      showToastMessage(response.data?.message || 'Note updated successfully', 'success');

      if (searchQuery.trim()) {
        await searchNotes(searchQuery);
      } else {
        await getAllNotes();
      }
    } catch (error) {
      showToastMessage(
        error.response?.data?.message || 'Error updating note pin',
        'error'
      );
    }
  };

  const handleSearch = async () => {
    await searchNotes(searchQuery);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleClearSearch = async () => {
    setSearchQuery('');
    await getAllNotes();
  };

  const editNote = (note) => {
    setOpenAddEditModal({
      isShown: true,
      type: 'edit',
      data: note,
    });
  };

  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
  useEffect(() => {
    getAllNotes();
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (isFirstSearchRender.current) {
      isFirstSearchRender.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchNotes(searchQuery);
      } else {
        getAllNotes();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <>
      <Navbar
        UserInfo={UserInfo}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        handleSearch={handleSearch}
        onClearSearch={handleClearSearch}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
          <div>
            <p className="text-sm font-semibold text-zinc-500">Workspace</p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-950 mt-1">All notes</h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            <span className="rounded-full bg-white border border-zinc-200 px-4 py-2 shadow-sm">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </span>
            {searchQuery.trim() && (
              <span className="rounded-full bg-zinc-950 text-white px-4 py-2 shadow-sm">
                Searching
              </span>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => editNote(note)}
                onDelete={() => deleteNote(note)}
                onPinNote={() => togglePinNote(note)}
              />
            ))
          ) : (
            <div className="col-span-full">
              <div className="border border-dashed border-zinc-300 bg-white/85 rounded-2xl shadow-sm px-6 py-14 text-center min-h-[320px] flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-5">
                  <MdAdd className="text-4xl text-zinc-700" />
                </div>
                <h3 className="text-2xl font-semibold text-zinc-950">
                  {searchQuery.trim() ? 'No matching notes' : 'No notes yet'}
                </h3>
                <p className="text-zinc-500 mt-2 max-w-md leading-6">
                  {searchQuery.trim()
                    ? 'Try a different keyword or clear the search to see all notes.'
                    : 'Your workspace is empty right now. Tap the add button to create your first note and start organizing your ideas.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-zinc-950 hover:bg-zinc-800 fixed right-6 sm:right-10 bottom-6 sm:bottom-10 cursor-pointer shadow-2xl shadow-zinc-400/60 transition"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: 'add',
            data: null,
          });
        }}
      >
        <MdAdd className="text-4xl text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: 'add', data: null })
        }
        style={{
          overlay: { backgroundColor: 'rgba(24,24,27,0.35)', backdropFilter: 'blur(6px)', zIndex: 50 },
        }}
        className="w-[calc(100vw-2rem)] max-w-[560px] bg-white rounded-2xl p-6 sm:p-7 absolute top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2 outline-none shadow-2xl shadow-zinc-950/20 border border-zinc-200"
      >
        <AddEditNotes
          key={openAddEditModal.data?._id || openAddEditModal.type}
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: 'add', data: null })
          }
        />
      </Modal>

      <Toast
        isShown={showToast.isShown}
        message={showToast.message}
        type={showToast.type}
        onClose={closeToast}
      />
    </>
  );
};

export default Home;
