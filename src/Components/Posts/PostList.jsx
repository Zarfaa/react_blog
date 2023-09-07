import React from 'react';
import "./Post.css";

const PostList = ({ posts }) => {
  
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
              <li key={comment.id}>
                {comment.body}
              </li>
            ))}
          </ul>
          
          <button >Comment</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
