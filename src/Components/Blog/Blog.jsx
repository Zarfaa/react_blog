import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../Posts/PostList';
import CreatePost from '../Posts/CreatePost';
import { getUserIdFromLocalStorage } from '../Auth/Login';
import './Blog.css';

const Blog = ({ authenticated }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '', Id: '' , userId: '' });
  const userId = getUserIdFromLocalStorage();
  console.log('userId from local storage:', userId);
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

  
  const handleCreateComment = (postId, newCommentText) => {
    const newComment = {
      id: "",
      body: newCommentText,
      userId: userId,
    };
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = [...post.comments, newComment];
        return {
          ...post,
          comments: updatedComments,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };
  
  
  console.log('authenticated:', authenticated);
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
       <PostList
  posts={posts}
  authenticated={authenticated}
  handleCreateComment={handleCreateComment}
/>
    </div>
  );
};

export default Blog;