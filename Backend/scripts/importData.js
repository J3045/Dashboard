// scripts/importData.js
const mongoose = require('mongoose');
const Data = require('../models/Data');
const jsonData = require('../jsondata.json');
const connectDB = require('../config/db');

connectDB();

const importData = async () => {
  try {
    await Data.deleteMany();
    await Data.insertMany(jsonData);
    console.log('Data imported successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
