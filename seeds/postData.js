const { Post } = require("../models") 

const postData = [
    {
        "post_title": "MVC",
        "post_content": "This is great software",
        "post_author": "Rod Bennett"
    
    },
    {
        "post_title": "OOP",
        "post_content": "Best thing ever",
        "post_author": "Johnny Appleseed"
    },
    {
        "post_title": "MVC",
        "post_content": "This is great software",
        "post_author": "Frank Sinatra"
    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
