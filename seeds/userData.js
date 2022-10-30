const { User } = require("../models")

const userData = 
[
    {
        username: "rod",
        password: "password12345"
    },
    {
        username: "jeronimo",
        password: "password12345"
    },
    {
        username: "sqlsucks",
        password: "password12345"
    },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
