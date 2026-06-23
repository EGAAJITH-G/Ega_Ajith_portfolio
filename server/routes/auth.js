import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import auth from '../middleware/auth.js';
import TokenBlacklist from '../models/TokenBlacklist.js';

const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: 'CREDENTIALS_REQUIRED',
      message: 'Both username and password parameters are required.'
    });
  }

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid username or decryption key.'
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid username or decryption key.'
      });
    }

    // Sign JWT Token (valid for 24h)
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'cyberpunk_ajith_secret_key_2026',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'CONSOLE_DECRYPTED_SUCCESSFULLY',
      token,
      admin: {
        username: admin.username
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

// Verify Auth Token status
router.get('/verify', auth, (req, res) => {
  res.json({
    status: 'AUTHORIZED',
    user: req.user
  });
});

// Change Admin Password
router.post('/change-password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      error: 'PASSWORD_REQUIRED',
      message: 'Both current password and new password are required.'
    });
  }

  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({
        error: 'ADMIN_NOT_FOUND',
        message: 'Admin account not found.'
      });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        error: 'INVALID_CURRENT_PASSWORD',
        message: 'Invalid current password. Verification failed.'
      });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        error: 'PASSWORD_WEAK',
        message: 'New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
      });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'PASSWORD_CHANGED_SUCCESSFULLY'
    });
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

// Admin Logout
router.post('/logout', auth, async (req, res) => {
  try {
    const token = req.token;
    const decoded = jwt.decode(token);
    const expiresAt = decoded && decoded.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 24 * 60 * 60 * 1000);

    const blacklistEntry = new TokenBlacklist({
      token,
      expiresAt
    });
    await blacklistEntry.save();

    res.json({
      success: true,
      message: 'LOGGED_OUT_SUCCESSFULLY'
    });
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

export default router;
