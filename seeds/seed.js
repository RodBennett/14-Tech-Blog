const sequelize = require('../config/connection');
const User = require('../models/User');
const Posts = require('../models/Posts')

const userData = require('./userData.json');
const postData = require('./postSeeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Posts.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    }  console.log("SEEDED ===============================================")

  process.exit(0);
};
seedDatabase()