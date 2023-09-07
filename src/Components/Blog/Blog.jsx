import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../Posts/PostList';
import CreatePost from '../Posts/CreatePost';
import './Blog.css';

const Blog = ({ authenticated }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '', Id: '' });

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        console.log('Fetched posts:', response.data);
        const fetchedPosts = response.data;
        Promise.all(
          fetchedPosts.map((post) =>
            axios
              .get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
              .then((commentResponse) => commentResponse.data)
          )
        ).then((comments) => {
          const postsWithComments = fetchedPosts.map((post, index) => ({
            ...post,
            comments: comments[index],
          }));
          setPosts(postsWithComments);
          console.log(posts)
        });
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);
  
  return (
    <div>
      {authenticated ? (
        <>
          <h1 className="Blog_Tittle">Welcome to the Blog</h1>
          <CreatePost
  newPost={newPost}
  setNewPost={setNewPost}
  posts={posts} 
  setPosts={setPosts}
  authenticated={authenticated}
/>
        </>
      ) : (
        <p>Please log in to view the blog.</p>
      )}
          <PostList posts={posts} />
    </div>
  );
};

export default Blog;
