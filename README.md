const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/?directConnection=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postSchema = new mongoose.Schema({
  post: String,
  comment: String,
});

const Posts = mongoose.model('PostCom', postSchema);

app.get('/comPost', async (req, res) => {
  const posts = await Posts.find({});
  res.json(posts);
});

app.post('/comPost', async (req, res) => {
  const { post, comment } = req.body;
  const posts = new Posts({ post, comment });
  await posts.save();
  res.json(posts);
});

app.put('/comPost/:id', async (req, res) => {
  const { id } = req.params;
  const { post, comment } = req.body;
  await Posts.findByIdAndUpdate(id, { post, comment });
  const updatedName = await Posts.findById(id);
  res.json(updatedName);
});

app.delete('/comPost/:id', async (req, res) => {
  const { id } = req.params;
  await Posts.findByIdAndDelete(id);
  res.json({ message: 'Post deleted' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
-------------------------------------------------------------------
import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onSuccess }) => {
  const [post, setPost] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:4000/comPost', {
      post,
      comment,
    });
    setPost('');
    setComment('');
    onSuccess(response.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        POST:
        <input
          type="text"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
      </label>
      <label>
        Comment:
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <button type="submit">Submit Post</button>
    </form>
  );
};

export default PostForm;

  newwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
