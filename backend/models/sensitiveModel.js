const mongoose = require('mongoose');

const SensitiveIssueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  issueType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: [Number],  
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('SensitiveIssue', SensitiveIssueSchema);
