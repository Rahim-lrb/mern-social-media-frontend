import axios from 'axios';

const url = 'http://localhost:5000/api';

export const fetchPosts = () => axios.get(`${url}/posts`);
export const fetchPostsByUser = (userId) => axios.get(`${url}/posts/user/${userId}`);

export const createPost = (formData) => axios.post("http://localhost:5000/api/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
});
export const createComment = (commentData) => axios.post("http://localhost:5000/api/posts/comments", commentData);

// export const updatePost = () => axios.put(url);
// export const deletePost = () => axios.delete(postId);

// export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (data) => axios.post(`${url}/posts/like`, data);
export const unlikePost = (data) => axios.post(`${url}/posts/unlike`, data);
// export const unlikePost = (data) => axios.post(`${url}/${id}/unlikePost`, data);
// export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`);
