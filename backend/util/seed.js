const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Task = require('../models/Task');

dotenv.config();

const seedTasks = [
  {
    title: 'Write proposal',
    description: 'Finish writing the project proposal for client.',
    status: 'To Do',
  },
  {
    title: 'Design homepage',
    description: 'Create responsive UI for the homepage.',
    status: 'In Progress',
  },
  {
    title: 'Fix login bug',
    description: 'Resolve issue where users can’t log in on mobile.',
    status: 'Done',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Task.deleteMany(); // wipe old data (optional)
    const result = await Task.insertMany(seedTasks);
    console.log('Seeded tasks:', result);
    process.exit();
  } catch (err) {
    console.error('Error seeding DB:', err);
    process.exit(1);
  }
};

seedDB();
