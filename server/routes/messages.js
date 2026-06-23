import express from 'express';
import Message from '../models/Message.js';
import auth from '../middleware/auth.js';
import { rateLimiter } from '../middleware/rateLimiter.js';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

// Submit guest message (Public)
router.post('/', rateLimiter(15 * 60 * 1000, 5), async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'FIELDS_REQUIRED',
      message: 'Name, email, and message details are required.'
    });
  }

  // Basic email regex check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'INVALID_EMAIL',
      message: 'Invalid email packet address format.'
    });
  }

  try {
    const newMessage = new Message({
      name,
      email,
      phone,
      message
    });
    await newMessage.save();

    res.status(201).json({
      message: 'TRANSMISSION_SECURED',
      data: newMessage
    });
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

// Fetch all messages (Admin Protected)
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

// Mark message as read (Admin Protected)
router.put('/:id/read', auth, validateObjectId, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!msg) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'Message record not found.' });
    }
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

// Delete message by ID (Admin Protected)
router.delete('/:id', auth, validateObjectId, async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'Message record not found.' });
    }
    res.json({ message: 'DOCUMENT_DELETED_FROM_TELEMETRY_LEDGER', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

export default router;
