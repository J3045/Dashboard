// routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

// GET all data
router.get('/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
