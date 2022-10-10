const { Post } = require("../models") 

const postData = [
    {
        post_title: "MVC",
        post_content: "This is great software",
        user_id: 1
    
    },
    {
        post_title: "OOP",
        post_content: "Best thing ever",
        user_id: 2
    },
    {
        post_title: "LOVE",
        post_content: "This is great software",
        user_id: 3
    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
