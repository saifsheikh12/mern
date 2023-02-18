import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onSuccess }) => {
  const [post, setPost] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:4000/Post', {
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