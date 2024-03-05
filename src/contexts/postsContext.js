import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './authContext';
import axios from 'axios';
import { fetchPosts, fetchPostsByUser, createPost, createComment, likePost, unlikePost, deletePost } from '../api';


// const url = 'http://localhost:5000/api'; local host
const url = "https://wex-backend.onrender.com/api" // hosted
// const url = "/api" 


export const PostContext = createContext([]);

export const PostProvider = ({ children }) => {
    const { currentUser } = useContext(UserContext)
    const [ fetched, setFetched ] = useState([]);
    const [ userPosts, setUserPosts ] = useState([]);


    const getPosts = async () => {
        try {
            const fetchedPosts = await fetchPosts();
            setFetched(fetchedPosts.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []); 


    const addPost = async (formData) => {
        console.log("adding a post")
        try {
            await createPost(formData)
            getPosts()
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };
    const deletePostById = async (postId) => {
        console.log("deleting a post")
        console.log(postId)
        try {
            await deletePost(postId)
            getPosts()
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const addComment = async (postId, content) => {
        console.log("add comment")
        try {
            await createComment({userId: currentUser._id , postId: postId, content: content })
            getPosts()
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

    const like = async (postId) => {
        console.log("like post")
        try {
            await likePost({"postId": postId,"userId": currentUser._id})
            getPosts()
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const unlike = async (postId) => {
        console.log("unlike post")
        try {
            await unlikePost({"postId": postId,"userId": currentUser._id})
            getPosts()
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };



    const fetchUserPosts = async (userId) => {
        try {
            const response = await fetchPostsByUser(userId)
            setUserPosts(response.data);
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            if (currentUser) {
                console.log("currentUser is ready")
                await fetchUserPosts(currentUser._id);
            }
        };

        fetchData();
    }, [currentUser]);


    return (
        <PostContext.Provider value={{ fetched, getPosts, addPost, addComment, like, unlike, userPosts, deletePostById, fetchUserPosts }}>
            {children}
        </PostContext.Provider>
    );
};
