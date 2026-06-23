import express from 'express';
import Certification from '../models/Certification.js';
import auth from '../middleware/auth.js';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

// Retrieve all certifications (Public)
router.get('/', async (req, res) => {
  try {
    const certs = await Certification.find().sort({ createdAt: 1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

// Create new certification (Admin Protected)
router.post('/', auth, async (req, res) => {
  const { title, issuer, date, credId, image, link } = req.body;

  if (!title || !issuer || !date) {
    return res.status(400).json({
      error: 'FIELDS_REQUIRED',
      message: 'Certification title, issuer, and date parameters are required.'
    });
  }

  if (image && image.length > 2 * 1024 * 1024) {
    return res.status(400).json({
      error: 'PAYLOAD_TOO_LARGE',
      message: 'Uploaded certification image exceeds the 2MB size limit.'
    });
  }

  try {
    const newCert = new Certification({
      title,
      issuer,
      date,
      credId: credId || '',
      image: image || '',
      link: link || ''
    });

    await newCert.save();
    res.status(201).json(newCert);
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

// Modify existing certification (Admin Protected)
router.put('/:id', auth, validateObjectId, async (req, res) => {
  try {
    const { image } = req.body;
    if (image && image.length > 2 * 1024 * 1024) {
      return res.status(400).json({
        error: 'PAYLOAD_TOO_LARGE',
        message: 'Uploaded certification image exceeds the 2MB size limit.'
      });
    }
    const cert = await Certification.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!cert) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'Certification record not found.' });
    }

    res.json(cert);
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

// Delete certification (Admin Protected)
router.delete('/:id', auth, validateObjectId, async (req, res) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'Certification record not found.' });
    }
    res.json({ message: 'CREDENTIAL_DELETED_FROM_LEDGER', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

export default router;
