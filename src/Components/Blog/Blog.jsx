import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../Posts/PostList/PostList';
import CreatePost from '../Posts/CreatePost';

const Blog = ({ authenticated }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  useEffect(() => {
    if (authenticated) {
      axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
          console.log('Fetched posts:', response.data); 
          setPosts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        });
    }
  }, [authenticated]);
  

  const handleEdit = (postId, updatedPostData) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${postId}`, updatedPostData)
      .then((response) => {
        const updatedPosts = posts.map((post) =>
          post.id === postId ? response.data : post
        );
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error('Error editing post:', error);
      });
  };
  
  const handleDelete = (postId) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(() => {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div>
      {authenticated ? (
        <>
          <h1>Welcome to the Blog</h1>
          <CreatePost newPost={newPost} setNewPost={setNewPost} posts={posts} setPosts={setPosts} />
          <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      ) : (
        <p>Please log in to view the blog posts.</p>
      )}
    </div>
  );
};

export default Blog;
