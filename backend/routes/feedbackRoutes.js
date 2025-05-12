const express = require('express');
const router = express.Router();
const SafetyFeedback = require('../models/feedbackModel');

// CREATE: Submit new feedback
router.post('/submit-feedback', async (req, res) => {
  try {
    const { isAnonymous, location, rating, timeOfDay, issueType, message } = req.body;

    if (!location || !rating || !timeOfDay || !issueType || !message) {
      return res.status(400).json({ message: 'All fields except anonymity are required' });
    }

    const feedback = new SafetyFeedback({
      isAnonymous,
      location,
      rating,
      timeOfDay,
      issueType,
      message
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedbackId: feedback._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit safety feedback' });
  }
});

// READ ALL: Get all feedback entries
router.get('/safety-feedbacks', async (req, res) => {
  try {
    const feedbacks = await SafetyFeedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching safety feedbacks' });
  }
});

// READ ONE: Get single feedback by ID
router.get('/get-feedback/:id', async (req, res) => {
  try {
    const feedback = await SafetyFeedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Safety feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch safety feedback' });
  }
});

// UPDATE: Update feedback by ID
router.put('/update-feedback/:id', async (req, res) => {
  try {
    const updatedFeedback = await SafetyFeedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Safety feedback not found' });
    }
    res.status(200).json({ message: 'Feedback updated successfully', feedback: updatedFeedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update safety feedback' });
  }
});

// DELETE: Delete feedback by ID
router.delete('/delete-feedback/:id', async (req, res) => {
  try {
    const deletedFeedback = await SafetyFeedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Safety feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete safety feedback' });
  }
});

module.exports = router;
