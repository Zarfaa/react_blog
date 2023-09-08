import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './PostList';
import CreatePost from './CreatePost';
import { getUserIdFromLocalStorage } from '../Auth/Login';
import "./Post.css"

const Posts = ({ authenticated }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '', Id: '', userId: '' });
  const [editedCommentText, setEditedCommentText] = useState({});
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
      isNew: true, 
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
  

  const handleEditPost = (postId, editedPost) => {
    console.log("Editing post:", postId, editedPost);
    const updatedPosts = posts.map((post) => {
      if (post.id === postId && post.createdBy === userId) {
        return { ...post, ...editedPost };
      }
      return post;
    });
    setPosts(updatedPosts);
  };
  

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => !(post.id === postId && post.createdBy === userId));
    setPosts(updatedPosts);
  };
  
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
        <p>Please log in to create Post and Comment</p>
      )}
      <PostList
  posts={posts}
  authenticated={authenticated}
  handleCreateComment={handleCreateComment}
  handleEditComment={handleEditComment}
  handleDeleteComment={handleDeleteComment}
  handleEditPostClick={handleEditPost} 
  handleDeletePost={handleDeletePost}
/>



    </div>
  );
};

export default Posts;