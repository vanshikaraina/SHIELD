const express = require('express');
const router = express.Router();
const multer = require('multer');
const Issue = require('../models/issueModel');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// CREATE (Fix here: add upload middleware!)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, location } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({ message: 'All fields except image are required' });
    }

    const issue = new Issue({
      title,
      description,
      location,
      image: req.file ? req.file.buffer : undefined // store file buffer if needed
    });

    await issue.save();
    res.status(201).json({ message: 'Issue reported successfully', issueId: issue._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    res.json(issue);
  } catch (err) {
    res.status(404).json({ message: 'Issue not found' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Issue updated', issue: updated });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);
    res.json({ message: 'Issue deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// GET /api/issues - Fetch all issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find(); // Fetch all issues from the database
    res.status(200).json(issues); // Send the issues as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching issues' });
  }
});


module.exports = router;