const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: String,
  answerText: String,
});

module.exports = mongoose.model('Question', questionSchema);
