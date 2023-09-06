import CreateComment from './Comments/CreateComment';

const PostList = ({ posts, currentUser, onEdit, onDelete, postComments, onCommentSubmit }) => {
  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          {postComments[post.id] && (
            <ul>
              {postComments[post.id].map((comment) => (
                <li key={comment.id}>
                  <p>{comment.text}</p>
                  {currentUser && currentUser.id === comment.userId && (
                    <>
                      <button onClick={() => onEdit(comment.id)}>Edit Comment</button>
                      <button onClick={() => onDelete(comment.id)}>Delete Comment</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
          <CreateComment postId={post.id} currentUser={currentUser} onCommentSubmit={onCommentSubmit} />
        </div>
      ))}
    </div>
  );
};

export default PostList