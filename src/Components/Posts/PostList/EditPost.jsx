import React, { useState} from 'react';

const EditPostForm = ({ post, onEdit }) => {
    const [editedPost, setEditedPost] = useState({ title: post.title, body: post.body });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedPost({ ...editedPost, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onEdit(post.id, editedPost); 
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={editedPost.title}
          onChange={handleInputChange}
        />
        <textarea
          name="body"
          placeholder="Content"
          value={editedPost.body}
          onChange={handleInputChange}
        ></textarea>
        <button type="submit">Save</button>
      </form>
    );
  };
  
  export default EditPostForm