const express = require('express');
const { publishResult, fetchResults, downloadResult } = require('../Controller/resultController');
const router = express.Router();

// Publish a result
router.post('/publish', publishResult);

// Fetch all results
router.get('/all', fetchResults);

// Download a result as PDF
router.get('/download/:resultId', downloadResult);

module.exports = router;

