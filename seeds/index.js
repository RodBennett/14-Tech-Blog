// import sequelize and seed .js files for seeding
const sequelize = require("../config/config");
const seedPosts = require("./postData");
const seedComments = require("./commentData");
const seedUsers = require("./userData");

// function to seed all, contains all calls for specific seed files
const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    await seedComments();

    // ends the function here so it doesn't perpetually seed data after initialization
    process.exit(0);
}

seedAll()
