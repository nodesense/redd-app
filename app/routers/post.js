const express = require('express');
const router  = express.Router();

const mongoose = require("mongoose")
const Post = mongoose.model("Post")

router.post('/create', function(req, res, next) {
    const post = new Post(req.body)
    const error = post.validateSync();
    res.json(error)
});

module.exports = router;
