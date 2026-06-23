import express from 'express';
import Skill from '../models/Skill.js';
import auth from '../middleware/auth.js';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

// Retrieve all skills (Public)
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, level: -1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

// Batch update skill levels (Admin Protected)
// Body shape: { adjustments: [ { id: "skill_id", level: 90 }, ... ] }
router.put('/adjust', auth, async (req, res) => {
  const { adjustments } = req.body;

  if (!adjustments || !Array.isArray(adjustments)) {
    return res.status(400).json({
      error: 'ADJUSTMENTS_REQUIRED',
      message: 'An adjustments array containing skill levels is required.'
    });
  }

  try {
    const updatePromises = adjustments.map(adj => {
      return Skill.findByIdAndUpdate(
        adj.id,
        { level: adj.level },
        { new: true, runValidators: true }
      );
    });

    const updatedSkills = await Promise.all(updatePromises);
    res.json({
      message: 'MATRIX_ADJUSTMENTS_SAVED',
      data: updatedSkills
    });
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

// Create new skill language/node (Admin Protected)
router.post('/', auth, async (req, res) => {
  const { name, level, category, color, desc, svgPath } = req.body;

  if (!name || level === undefined || !category) {
    return res.status(400).json({
      error: 'FIELDS_REQUIRED',
      message: 'Technology name, level, and category tab are required.'
    });
  }

  try {
    const newSkill = new Skill({
      name,
      level,
      category,
      color: color || '#00f5ff',
      desc: desc || '',
      svgPath: svgPath || ''
    });

    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

// Update skill details (Admin Protected)
router.put('/:id', auth, validateObjectId, async (req, res) => {
  const { name, level, category, color, desc, svgPath } = req.body;
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name, level, category, color, desc, svgPath },
      { new: true, runValidators: true }
    );
    if (!updatedSkill) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'Skill node not found.' });
    }
    res.json(updatedSkill);
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

// Delete skill (Admin Protected)
router.delete('/:id', auth, validateObjectId, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'Skill node not found.' });
    }
    res.json({ message: 'TECH_NODE_DELETED', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

export default router;
