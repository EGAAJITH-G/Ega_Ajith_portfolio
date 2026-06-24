import express from 'express';
import Project from '../models/Project.js';
import auth from '../middleware/auth.js';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

// Retrieve all projects (Public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

// Create new project (Admin Protected)
router.post('/', auth, async (req, res) => {
  const {
    title,
    desc,
    category,
    tags,
    github,
    live,
    image,
    active,
    stars,
    forks,
    language,
    subtitle,
    header,
    appType,
    workingStatus,
    imageAlign
  } = req.body;

  if (!title || !desc) {
    return res.status(400).json({
      error: 'FIELDS_REQUIRED',
      message: 'Project title and description details are required.'
    });
  }

  if (image && image.length > 2 * 1024 * 1024) {
    return res.status(400).json({
      error: 'PAYLOAD_TOO_LARGE',
      message: 'Uploaded project image exceeds the 2MB size limit.'
    });
  }

  try {
    const newProject = new Project({
      title,
      desc,
      category: category || 'frontend',
      tags: tags || [],
      github: github || '',
      live: live || '',
      image: image || '',
      active: active !== undefined ? active : true,
      stars: stars || 0,
      forks: forks || 0,
      language: language || '',
      subtitle: subtitle || '',
      header: header || '',
      appType: appType || '',
      workingStatus: workingStatus || '',
      imageAlign: imageAlign || 'top'
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

// Modify existing project (Admin Protected)
router.put('/:id', auth, validateObjectId, async (req, res) => {
  try {
    const { image } = req.body;
    if (image && image.length > 2 * 1024 * 1024) {
      return res.status(400).json({
        error: 'PAYLOAD_TOO_LARGE',
        message: 'Uploaded project image exceeds the 2MB size limit.'
      });
    }
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'Project record not found.' });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

// Delete project (Admin Protected)
router.delete('/:id', auth, validateObjectId, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'Project record not found.' });
    }
    res.json({ message: 'PROJECT_DELETED_FROM_TELEMETRY_LEDGER', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'SERVER_ERROR', message: err.message });
  }
});

export default router;
