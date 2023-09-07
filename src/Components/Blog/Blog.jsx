import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../Posts/PostList/PostList';
import CreatePost from '../Posts/CreatePost';

const Blog = ({ authenticated }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        console.log('Fetched posts:', response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      {authenticated ? ( 
        <>
          <h1>Welcome to the Blog</h1>
          <CreatePost newPost={newPost} setNewPost={setNewPost} posts={posts} setPosts={setPosts} authenticated={authenticated} />
          <PostList posts={posts} authenticated={authenticated} />
        </>
      ) : (
        <p>Please log in to view the blog.</p>
      )}
    </div>
  );
};

export default Blog;
