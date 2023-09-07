const CreateComment = ({ newComment, setNewComment, postId, authenticated, comment, setComment }) => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewComment({ ...newComment, [name]: value, userId: authenticated.userId });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const commentId = Math.max(...comment.map((comment) => comment.id), 0) + 1;
      const newCommentWithId = { ...newComment, id: commentId };
      setComment([newCommentWithId, ...comment]);
      setNewComment({ body: '' , postId :"" , userId :""});
    };
  
    return (
      <>
        <div>
          <textarea
            name="body"
            className="form-control my-3"
            placeholder="Content"
            value={newComment.body}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <button type="submit" className="Post_Btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </>
    );
  };
  
  export default CreateComment;
  