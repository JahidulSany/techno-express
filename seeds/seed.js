// Import required packages
const sequelize = require('../config/connection');

// import models
const { User, Category, Post } = require('../models');

// import seed data
const blogsData = require('./blogs.json');
const { users, posts, categories } = blogsData;

// Seed database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(users);
  await Category.bulkCreate(categories);
  await Post.bulkCreate(posts);

  process.exit(0);
};

// Call seedDatabase function
seedDatabase();
