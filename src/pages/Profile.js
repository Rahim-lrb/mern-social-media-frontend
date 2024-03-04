import React, {useContext, useEffect, useState} from 'react';
import Post from '../components/Post';
import { UserContext } from '../contexts/authContext';
import { PostContext } from '../contexts/postsContext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Profile = (props) => {
    const { currentUser } = useContext(UserContext); 
    const location = useLocation()
    const { userPosts } = useContext(PostContext);
    const userForUsing = location.state && location.state.user ? location.state.user : currentUser;


    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        fetchUserPosts()
    }, [userForUsing]);

    const fetchUserPosts = async (userId) => {
        try {
            // const response = await axios.get(`http://localhost:5000/api/posts/user/${userForUsing._id}`);
            // const response = await axios.get(`https://wex-backend.onrender.com/api/posts/user/${userForUsing._id}`);
            const response = await axios.get(`/api/posts/user/${userForUsing._id}`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };
    console.log("posts")
    console.log(posts)

    return (
        <div>
            <div className="p-16">
                <div className="p-8 bg-white shadow mt-24">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                            <div>
                                <p className="font-bold text-gray-700 text-xl">0</p>
                                <p className="text-gray-400">Friends</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">{posts.length}</p>
                                <p className="text-gray-400">posts</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">0</p>
                                <p className="text-gray-400">Comments</p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                <img src={userForUsing.image} alt='profile' className="rounded-full overflow-hidden w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                            <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">Edit</button>
                            <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">Message</button>
                        </div>
                    </div>
                    <div className="mt-20 text-center border-b pb-12">
                        <h1 className="text-4xl font-medium text-gray-700">{userForUsing.name}<span className="font-light text-gray-500">{userForUsing.age}</span></h1>
                        <p className="font-light text-gray-600 mt-3">{userForUsing.location}</p>
                        <p className="mt-8 text-gray-500">Solution Manager - Creative Tim Officer</p>
                        <p className="mt-2 text-gray-500">University of Computer Science</p>
                    </div>
                    <div className="mt-12 flex flex-col justify-center">
                        <p className="text-gray-600 text-center font-light lg:px-16">{userForUsing.bio}</p>
                        <button className="text-indigo-500 py-2 px-4 font-medium mt-4">Show more</button>
                    </div>
                </div>
            </div>


            <div className='w-3/4 mx-auto'>
                {posts && posts.map(post => (
                    <Post key={post.id} postData={post} />
                ))}
            </div>
        </div>
    );
};

export default Profile;
