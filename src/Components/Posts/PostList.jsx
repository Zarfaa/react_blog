import React, { useState, useEffect } from 'react';
import "./Post.css";
import { getUserIdFromLocalStorage } from '../Auth/Login';

const userId = getUserIdFromLocalStorage();

const PostList = ({
  posts,
  authenticated = false,
  handleCreateComment,
  handleEditComment,
  handleDeleteComment,
  handleDeletePost,
  handleEditPostClick, 
}) => {
  const [newComment, setNewComment] = useState('');
  const [editedCommentText, setEditedCommentText] = useState({});
  const [editedPostData, setEditedPostData] = useState({});

  const handleCommentChange = (e, commentId) => {
    setEditedCommentText((prevEditedCommentText) => ({
      ...prevEditedCommentText,
      [commentId]: e.target.value,
    }));
  };
  useEffect(() => {
    console.log('PostList re-rendered'); // Add this line to check if the component re-renders
  }, [posts]);
  const handleCommentSubmit = (postId) => {
    handleCreateComment(postId, newComment);
    setNewComment('');
  };

  const handleEditPost = (postId, post) => {
    const updatedPostData = {
      title: editedPostData[postId]?.title || post.title,
      body: editedPostData[postId]?.body || post.body,
    };
    console.log("Updated post data:", updatedPostData);
  
    handleEditPostClick(postId, updatedPostData);
    setEditedPostData((prevEditedPostData) => ({
      ...prevEditedPostData,
      [postId]: {},
    }));
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
            <div className='CommentActions'>
              {post.createdBy === userId && (
                <>
                  <button
                    className='Comment_Btn'
                    onClick={() => handleEditPost(post.id, post)} // Use the prop 'handleEditPost'
                  >
                    Edit Post
                  </button>

                  <button
                    className='Comment_Btn'
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete Post
                  </button>
                </>
              )}
            </div>
          )}
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
