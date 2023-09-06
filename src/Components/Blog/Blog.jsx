import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../Posts/PostList/PostList';
import CreatePost from '../Posts/CreatePost';
import { useNavigate } from 'react-router-dom';


const Blog = ({ isAuthenticated }) => {
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }


    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, [isAuthenticated, navigate]);

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
      <h1>Welcome to the Blog</h1>
      <CreatePost newPost={newPost}
        setNewPost={setNewPost}
        posts={posts}
        setPosts={setPosts}
        currentUser={currentUser}/>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching posts.</p>
      ) : (
        <PostList posts={posts}
        currentUser={currentUser} 
        onEdit={handleEdit}
        onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Blog;
