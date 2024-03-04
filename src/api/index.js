import axios from 'axios';

// const url = 'http://localhost:5000/api';
const url = "https://wex-backend.onrender.com/api";
// const url = "/api";


export const fetchPosts = () => axios.get(`${url}/posts`);

export const fetchPostsByUser = (userId) => axios.get(`${url}/posts/user/${userId}`);


export const createPost = (formData) => axios.post(`${url}/posts`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
});


export const deletePost = (postId) => axios.delete(`${url}/posts/${postId}`);

export const createComment = (commentData) => axios.post("http://localhost:5000/api/posts/comments", commentData);

export const likePost = (data) => axios.post(`${url}/posts/like`, data);
export const unlikePost = (data) => axios.post(`${url}/posts/unlike`, data);

// export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
