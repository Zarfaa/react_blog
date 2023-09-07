
import React, { useState } from 'react';

const CreateComment = ({ postId, onCommentSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCommentSubmit(postId, commentText);
    setCommentText('');
  };

  return (
    <div>
      <h3>Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name="comment"
          placeholder="Write your comment here"
          value={commentText}
          onChange={handleCommentChange}
        />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default CreateComment;
