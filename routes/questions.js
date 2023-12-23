const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Set to store sent questions' IDs or unique identifiers


router.post('/add', async (req, res) => {
  const { questionText, answerText } = req.body;
  try {
    const newQuestion = new Question({ questionText, answerText });
    await newQuestion.save();
    res.json({ success: true, message: 'Question added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding question', error });
  }
});
let sentQuestions = new Set();
router.get('/random', async (req, res) => {
  try {
    if (sentQuestions.size === 0) {
      // Fetch all questions IDs from the database
      const allQuestionIds = await Question.find({}, '_id');

      
      // Populate the sentQuestions set with all question IDs
      sentQuestions = new Set(allQuestionIds.map((question) => question._id));
    }

    if (sentQuestions.size === 0) {
      return res.status(404).json({ error: 'No more unique questions' });
    }

    // Pick a random question ID from sentQuestions set
    const questionIdsArray = Array.from(sentQuestions);
    const randomQuestionId = questionIdsArray[Math.floor(Math.random() * questionIdsArray.length)];

    // Fetch the random question using its ID
    const randomQuestion = await Question.findById(randomQuestionId);
    sentQuestions.delete(randomQuestionId); // Remove the selected question from the set

    res.json(randomQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch a random question' });
  }
});

module.exports = router;
