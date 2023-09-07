import React, { useEffect } from 'react';
import "./Post.css"
import { getUserIdFromLocalStorage } from '../Auth/Login';

const CreatePost = ({ newPost, setNewPost, posts, setPosts}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const userId = getUserIdFromLocalStorage();
    setNewPost({ ...newPost, [name]: value, userId });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postId = Math.max(...posts.map((post) => post.id), 0) + 1;
    const newPostWithId = { ...newPost, id: postId, comments: [] }; 
    setPosts([newPostWithId, ...posts]);
    setNewPost({ title: '', body: '', Id: '' });

    const postKey = `post_${postId}`;
    localStorage.setItem(postKey, JSON.stringify(newPostWithId));
  };

  return (
    <>
      <p>
        <button class="Post_Btn" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          <i class="fa-solid fa-plus me-2"></i>Create Post
        </button>
      </p>
      <div class="collapse" id="collapseExample">
        <div class="card card-body mx-5">
          <form onSubmit={handleSubmit}>
            <div>
              <input type="text" name="title" className="form-control" placeholder="Title" value={newPost.title} onChange={handleInputChange} />
            </div>
            <div>
              <textarea name="body" className="form-control my-3" placeholder="Content" value={newPost.body} onChange={handleInputChange}></textarea>
            </div>
            <div>
              <button type="submit" className='Post_Btn'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
