const { Comment } = require("../models")
const commentData = 
[
    {
        "content": "MVC is the best ever!",
        "post_id": 1,
        "user_id": 1
    },
    {
        "content": "OOP is very handy!",
        "post_id": 2,
        "user_id": 2
    },
    {
        "content": "I enjoy this!",
        "post_id": 3,
        "user_id": 3
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
