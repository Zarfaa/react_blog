import React, { useState } from 'react';
import "./Post.css";

const PostList = ({
  posts,
  authenticated = false,
  handleCreateComment,
  handleEditComment,
  handleDeleteComment,
}) => {
  const [newComment, setNewComment] = useState('');
  const [editedCommentText, setEditedCommentText] = useState({}); // Use an object to store edited text for each comment

  const handleCommentChange = (e, commentId) => {
    // Update the editedCommentText for the specific comment
    setEditedCommentText({ ...editedCommentText, [commentId]: e.target.value });
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
            {post.comments.map((comment, index) => (
              <li key={`${post.id}-${comment.id}-${index}`}>
                <div className='CommentText'>{comment.body}</div>
                {authenticated && (
                  <div className='CommentActions'>
                    {comment.isNew ? (
                      <div>
                        <textarea
                          rows="3"
                          placeholder="Edit your comment..."
                          value={editedCommentText[comment.id] || ''} // Use editedCommentText for this comment
                          onChange={(e) => handleCommentChange(e, comment.id)} // Pass the commentId
                        />
                        <button
                          className='Comment_Btn'
                          onClick={() => handleEditComment(post.id, comment.id, editedCommentText[comment.id])}
                        >
                          Edit
                        </button>
                        <button className='Comment_Btn' onClick={() => handleDeleteComment(post.id, comment.id)}>Delete</button>
                      </div>
                    ) : null}
                  </div>
                )}
              </li>
            ))}
          </ul>
          {authenticated && (
            <div className='Comment'>
              <textarea
                rows="3"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div>
                <button className='Comment_Btn' onClick={() => handleCommentSubmit(post.id)}>Comment</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
