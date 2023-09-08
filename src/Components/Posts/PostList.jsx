import React, { useState } from 'react';
import "./Post.css";

const PostList = ({
  posts,
  authenticated = false,
  handleCreateComment
}) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (postId) => {
    handleCreateComment(postId, newComment);
    setNewComment('');
  };

  return (
    <div className="Posts">
      <h2 className="Post_heading py-3 mb-5">Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <h4 className='Comments'>Comments:</h4>
          <ul>
            {post.comments.map((comment) => (
              <li key={`${post.id}-${comment.id}`}>
                {comment.body}
              </li>
            ))}

          </ul>
          {authenticated && (
            <div>
              <textarea
                rows="3"
                placeholder="Add a comment..."
                value={newComment}
                onChange={handleCommentChange}
              />
              <button onClick={() => handleCommentSubmit(post.id)}>Comment</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;