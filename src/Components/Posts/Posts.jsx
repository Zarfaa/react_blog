import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './PostList';
import CreatePost from './CreatePost';
import { useNavigate } from 'react-router-dom'; 
import "./Post.css"

const Posts = ({ authenticated }) => {
  const [posts, setPosts] = useState([]); 
  const navigate = useNavigate()
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
          <CreatePost posts={posts} setPosts={setPosts} authenticated={authenticated}/>
        </>
      ) : (
        navigate('/home')
      )}
      <PostList  setPosts={setPosts} posts={posts} authenticated={authenticated}/>
    </div>
  );
};

export default Posts;