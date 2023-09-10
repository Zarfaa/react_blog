import React, { useState } from 'react';
import "./Post.css"
import { getUserIdFromLocalStorage } from '../Auth/Login';

const CreatePost = ({ posts, setPosts }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [newpost, setNewpost] = useState([]);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const postCreated = (title, body) => {
    if (title && body) {
      return { success: true };
    } else {
      return { success: false, error: 'post_creation_failed' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = getUserIdFromLocalStorage();
    const postId = posts.length > 0 ? Math.max(...posts.map((post) => post.id), 0) + 1 : 1;
    
    try {
      const response = await postCreated(title, body);
      if (response.success) {
        const newPostWithId = {
          id: postId,
          title: title,
          body: body,
          comments: [],
          userId: userId,
          isNew: true,
        };
        setPosts([newPostWithId, ...posts]);
        setNewpost([newPostWithId, ...newpost])
        setTitle('');
        setBody('');
        localStorage.setItem('newpost', JSON.stringify(newpost));
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <>
      <p>
        <button className="Post_Btn" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          <i className="fa-solid fa-plus me-2"></i>Create Post
        </button>
      </p>
      <div className="collapse" id="collapseExample">
        <div className="card card-body mx-5">
          <form onSubmit={handleSubmit}>
            <div>
              <input type="text" name="title" className="form-control" placeholder="Title" value={title} onChange={handleTitleChange} />
            </div>
            <div>
              <textarea name="body" className="form-control my-3" placeholder="Content" value={body} onChange={handleBodyChange}></textarea>
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
