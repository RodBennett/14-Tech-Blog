const { User } = require("../models")

const userData = 
[
    {
        username: "rod",
        email: "rod.benett75@gmail.com",
        password: "password12345"
    },
    {
        username: "ernie",
        email: "ernie@ernie.com",
        password: "password12345"
    },
    {
        username: "bert",
        email: "bert@bert.com",
        password: "password12345"
    },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
