import "./Home.css"
import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../Posts/PostList';

let Home = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios
          .get('https://jsonplaceholder.typicode.com/posts')
          .then((response) => {
            console.log('Fetched posts:', response.data);
            const fetchedPosts = response.data;
            setPosts(fetchedPosts);
          })
          .catch((error) => {
            console.error('Error fetching posts:', error);
          });
      }, []);

    return (
        <div className="Home_Container">
            <h1>ReactJs Blog</h1>
            <Link to="/login"><button type="submit" className='Post_Btn'><i class="fa-solid fa-plus me-2"></i>Create Post</button></Link>
            <PostList posts={posts}/>
        </div>
    )
}

export default Home
