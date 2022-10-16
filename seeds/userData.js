const { User } = require("../models")

const userData = 
[
    {
        username: "rod",
        password: "password12345"
    },
    {
        username: "ernie",
        password: "password12345"
    },
    {
        username: "bert",
        password: "password12345"
    },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
