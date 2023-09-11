import React, { useState} from 'react';
import "./Post.css";
import { getUserIdFromLocalStorage } from '../Auth/Login';

const userId = getUserIdFromLocalStorage();

const PostList = ({
  setPosts,
  posts,
  authenticated = false
}) => {
  const [newComment, setNewComment] = useState([]);
  const [body, setBody] = useState("");
  const [editedCommentText, setEditedCommentText] = useState({});
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const commentCreated = (title) => {
    if (title) {
      return { success: true };
    } else {
      return { success: false, error: 'Comment_creation_failed' };
    }
  };
  const handleCreateComment = async (postId) => {
    try {
      const response = await commentCreated(body);
      if (response.success) {
        const userId = getUserIdFromLocalStorage();
        const commentId = Math.max(...posts.map((post) => Math.max(...post.comments.map((comment) => comment.id), 0)), 0) + 1;

        const newCommentWithId = {
          id: commentId,
          body: body,
          userId: userId,
          isNew: true,
        };

        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            const updatedComments = [...post.comments, newCommentWithId];
            return {
              ...post,
              comments: updatedComments,
            };
          }
          return post;
        });

        setPosts(updatedPosts);
        setNewComment('');
        setBody('');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleCommentChange = (e, commentId) => {
    setEditedCommentText((prevEditedCommentText) => ({
      ...prevEditedCommentText,
      [commentId]: e.target.value,
    }));
  };


  const handleEditComment = (postId, commentId, editedCommentText) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, body: editedCommentText };
          }
          return comment;
        });
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleDeleteComment = (postId, commentId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.filter((comment) => comment.id !== commentId);
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };


  const handleEditPost = (postId, editedTitle, editedBody) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId && post.userId === userId) {
        return { ...post, title: editedTitle, body: editedBody };
      }
      return post;
    });
    setPosts(updatedPosts);
  };


  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => !(post.id === postId && post.userId === userId));
    setPosts(updatedPosts);
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
                          value={editedCommentText[comment.id] || ''}
                          onChange={(e) => handleCommentChange(e, comment.id)}
                        />
                        <button
                          className='Comment_Btn'
                          onClick={() => handleEditComment(post.id, comment.id, editedCommentText[comment.id])}
                        >
                          Edit
                        </button>
                        <button
                          className='Comment_Btn'
                          onClick={() => handleDeleteComment(post.id, comment.id)}
                        >
                          Delete
                        </button>

                      </div>
                    ) : null}
                  </div>
                )}
              </li>

            ))}

          </ul>
          {authenticated && post.isNew && (
            <div className='PostActions'>
              {post.userId === userId && (
                <>
                  <button
                    className='Comment_Btn'
                    onClick={() => {
                      setEditedTitle(post.title);
                      setEditedBody(post.body);
                      handleEditPost(post.id, editedTitle, editedBody);
                    }}
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
          {authenticated && post.isNew && post.userId === userId && (
            <div className='EditPostForm'>
              <div>
              <input
                type='text'
                placeholder='Edit title...'
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              </div>
              <textarea
                rows="3"
                placeholder="Edit body..."
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
              />
            </div>
          )}

          {authenticated && (
            <div className='Comment'>
              <textarea
                rows="3"
                placeholder="Add a comment..."
                value={body}
                onChange={handleBodyChange}
              />
              <div>
                <button className='Comment_Btn' onClick={() => handleCreateComment(post.id)}>Comment</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;