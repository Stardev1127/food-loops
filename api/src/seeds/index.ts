import dotenv from 'dotenv';
dotenv.config();
import Staff from '../shared/models/staffModel';
import staffData from './staff.json';
import mongoose from 'mongoose';

import { keys } from '../config';

mongoose.connect(keys.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Import data into database
const importData = async () => {
  try {
    await Staff.create(staffData);
    console.log('✨ Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from collection
const deleteData = async () => {
  try {
    console.log('✨ Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();
