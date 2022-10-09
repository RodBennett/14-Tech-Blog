const { User } = require("../models")

const userData = 
[
    {
        "user_id": 1,
        "username": "rod",
        "email": "rod.benett75@gmail.com",
        "password": "password12345"
    },
    {
        "user_id": 2,
        "username": "ernie",
        "email": "ernie@ernie.com",
        "password": "password12345"
    },
    {
        "user_id": 3,
        "username": "bert",
        "email": "bert@bert.com",
        "password": "password12345"
    },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
