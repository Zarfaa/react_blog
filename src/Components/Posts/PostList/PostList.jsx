const PostList = ({ posts, user, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          {user && post.userId === user.id && (
            <>
              <button onClick={() => onEdit(post)}>Edit</button>
              <button onClick={() => onDelete(post)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList