const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { authenticateToken } = require('./utilities');
const User = require('./models/user.models');
const Notes = require('./models/notes.models');
require('dotenv').config();

const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected 🛢️'))
  .catch((err) => console.log(err));

// test route
app.get('/', (req, res) => {
  res.json({ data: 'Hello World!' });
});


// ================= SIGNUP =================
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Full name is required' });
  }
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const user = new User({ name, email, password });
  await user.save();

  const accessToken = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );

  return res.status(201).json({
    error: false,
    user,
    accessToken,
    message: 'User created successfully'
  });
});


// ================= LOGIN =================
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const accessToken = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );

  return res.status(200).json({
    error: false,
    user,
    message: 'Login successful',
    accessToken
  });
});

app.get('/profile', authenticateToken, async (req, res) => {
  const user = req.user;
  const isUserExist = await User.findById(user._id);

  if (!isUserExist) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  return res.status(200).json({
    user: {
      name: isUserExist.name,  
      email: isUserExist.email,
      id: isUserExist._id,
      createdAt: isUserExist.createdOn
    },
    message: 'Profile retrieved successfully'
  });
}

);
// ================= ADD NOTE =================
app.post('/addNotes', authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;

  if (!title?.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  if (!content?.trim()) {
    return res.status(400).json({ message: 'Content is required' });
  }

  try {
    const newNote = new Notes({
      title,
      content,
      tags: tags || [],
      userId: user._id
    });

    await newNote.save();

    return res.status(201).json({
      error: false,
      note: newNote,
      message: 'Note created successfully'
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});
app.put('/editNotes/:id', authenticateToken, async (req, res) => {
  const NoteID = req.params.id;
  const { title, content, tags, isPinned } = req.body;
  const user = req.user;

  if (
    !title?.trim() &&
    !content?.trim() &&
    !tags &&
    isPinned === undefined
  ) {
    return res.status(400).json({
      message: 'At least one field is required to update'
    });
  }

  try {
    const note = await Notes.findOne({
      _id: NoteID,
      userId: user._id
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags !== undefined) note.tags = tags;
    if (isPinned !== undefined) note.isPinned = isPinned;

    await note.save();

    return res.status(200).json({
      error: false,
      note,
      message: 'Note updated successfully'
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.get('/getNotes', authenticateToken, async (req, res) => {
  const user = req.user;
  try {
    const notes = await Notes.find({ userId: user._id }).sort({ createdAt: -1 });
    return res.status(200).json({
      error: false,
      notes,
      message: 'Notes retrieved successfully'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  } 
});


app.delete('/deleteNotes/:id', authenticateToken, async (req, res) => {
  const NoteID = req.params.id;
  const user = req.user;
  try {
    const note = await Notes.findOneAndDelete({
      _id: NoteID,
      userId: user._id
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    return res.status(200).json({
      error: false,
      message: 'Note deleted successfully'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }

});

app.put('/togglePin/:id', authenticateToken, async (req, res) => {
  const noteId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        error: false,
        message: 'Invalid note ID format'
      });
    }

    const note = await Notes.findOne({
      _id: noteId,
      userId: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        error: false,
        message: 'Note not found or unauthorized'
      });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    return res.status(200).json({
      error: false,
      message: note.isPinned
        ? 'Note pinned successfully'
        : 'Note unpinned successfully',
      data: {
        id: note._id,
        isPinned: note.isPinned
      }
    });
  } catch (error) {
    console.error('Toggle Pin Error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        error: false,
        message: 'Invalid note ID'
      });
    }

    return res.status(500).json({
      error: false,
      message: 'Internal server error'
    });
  }
});

app.get('/searchNotes', authenticateToken, async (req, res) => {
  const { query } = req.query;
  const user = req.user;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const notes = await Notes.find({
      userId: user._id,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } }
      ]
    });

    return res.status(200).json({
      error: false,
      notes,
      message: 'Notes retrieved successfully'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// ================= SERVER =================
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

module.exports = app;
