
import React from 'react';
import "./CreatePost.css"

const CreatePost = ({ newPost, setNewPost, posts, setPosts}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postId = Math.max(...posts.map((post) => post.id), 0) + 1;
    const newPostWithId = { ...newPost, id: postId };
    setPosts([newPostWithId, ...posts]);
    setNewPost({ title: '', body: '' });
  };
  
  return (
    <div className='Container'>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className='post'>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newPost.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <textarea className="my-3"
              name="body"
              placeholder="Content"
              value={newPost.body}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <button type="submit" className='Post_Btn'>Create Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
