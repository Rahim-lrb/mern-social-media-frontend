import React, {useState, useContext, useEffect } from 'react';
import { createComment } from '../api';
import { UserContext } from "../contexts/authContext"
import { PostContext } from '../contexts/postsContext';
import { Link } from "react-router-dom"

const Post = ({ postData } ) => { // ! we either send the data from home.js (all posts), or from profile posts of the owner, or other posts
    const { addComment, like, unlike } = useContext(PostContext);
    const [ passedData, setPassedData] = useState(postData.user) // 

    // we use it to find out if we likes any of the posts
    const { currentUser } = useContext(UserContext);
    const [isLiked, setIsLiked] = useState(() => {
        return postData.likes && postData.likes.find(like => like._id === currentUser._id) ? true : false;
    });


    const [ newComment, setNewComment ] = useState('');

    const calculateTimeAgo = (createdAt) => {
        const currentTime = new Date();
        const createdAtDate = new Date(createdAt);
        const timeDifference = currentTime - createdAtDate;
        const minutes = Math.floor(timeDifference / 60000);

        if (minutes < 60) {
            return `${minutes} mins ago`;
        } else if (minutes < 1440) {
            return `${Math.floor(minutes / 60)} hours ago`;
        } else {
            return `${Math.floor(minutes / 1440)} days ago`;
        }
    };


    const handleLiking = async (postId) => {
        if (isLiked) {
            await unlike(postId)
        } else {
            await like(postId)
        }
        setIsLiked(prevIsLiked => !prevIsLiked);
    }
    console.log(postData.user)
    
    return (
        <div className="bg-white shadow-md rounded-lg mb-6">
            <div className="flex flex-row px-2 py-3 mx-3">
                <Link to="/profile" state={{ user: passedData }}>
                    <div className="w-auto h-auto rounded-full">
                        <img className="w-12 h-12 object-cover rounded-full shadow cursor-pointer" alt="User avatar" src={postData.user?.image} />
                    </div>
                </Link>
                <div className="flex flex-col mb-2 ml-4 mt-1">
                    <div className="text-gray-600 text-sm font-semibold">{postData?.user?.name}</div>
                    <div className="flex w-full mt-1">
                        <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                            User
                        </div>
                        <div className="text-gray-400 font-thin text-xs">
                            • {calculateTimeAgo(postData?.createdAt)}
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-100"></div>
            <div className="text-gray-400 font-medium text-sm mb-5 mt-6 mx-3 px-2">
                <div className="grid grid-cols-6 col-span-2 gap-2">
                    <div className=" overflow-hidden rounded-xl col-span-6 max-h-[26rem]">
                        {postData.image && (
                            <img className="h-full w-full object-cover"
                                src={postData.image}
                                    alt="Post Image" />
                            )}
                    </div>
                </div>
            </div>
            <div className="text-gray-500 text-xl mb-4 mx-3 px-2 font-bold capitalize text-center">{postData?.title}{/* <span className="text-gray-400">more</span> */}</div>
            <p className='text-gray-700 text-md font-medium mb-10 text-center'>{postData?.content}</p>
            <div className="flex justify-start mb-4 border-t border-gray-100">
                <div className="flex w-full mt-1 pt-2 pl-5">
                    <span
                        className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14px"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                        </svg>
                    </span>
                </div>
                <div className="flex justify-end w-full mt-1 pt-2 pr-5">
                    <span
                        className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14px"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z">
                            </path>
                        </svg>
                    </span>
                    
                    {isLiked ? (
                        <span
                            className="bg-white hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2 like-button select-none"
                            onClick={() => handleLiking(postData._id)}>
                            <svg className="h-4 w-4 text-red-500 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </span>
                    ) : (
                        <span
                            className="bg-white hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2 like-button select-none"
                            onClick={() => handleLiking(postData._id)}>
                            <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z">
                                </path>
                            </svg>
                        </span>
                    )}

                </div>
            </div>
            <div className="flex w-full border-t border-gray-100">
                <div className="mt-3 mx-5 flex flex-row text-xs">
                    <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                        Comments:<div className="ml-1 text-gray-400 text-ms">{postData?.comments?.length}</div>
                    </div>
                </div>
                <div className="mt-3 mx-5 w-full flex justify-end text-xs">
                    <div className="flex text-gray-700  rounded-md mb-2 mr-4 items-center">Likes:
                        <span className="pl-2 text-gray-400 font-normal text-xs">{postData.likes ? postData.likes.length : 0}</span>
                    </div>
                </div>
            </div>
            <div
                className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                <img className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                    alt="User avatar"
                    src={`${currentUser.image}`}/>
                <span className="absolute inset-y-0 right-0 flex items-center pr-6">
                    <button type="submit" onClick={() => {addComment(postData._id, newComment); setNewComment("") } }
                        className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500">
                        <svg className="ml-1" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </span>
                <input value={newComment} onChange={(e) => setNewComment(e.target.value)} type="search" className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue" style={{ borderRadius: '25px' }} placeholder="Post a comment..." autoComplete="off" />
            </div>
            {postData.comments.map(comment => (
                <div key={comment._id} className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                    <img className="w-10 h-10 object-cover rounded-full shadow cursor-pointer mr-3" alt="User avatar"   src={comment?.user?.image}/>
                    <h3 className='font-semibold mr-4 text-gray-400'>{comment?.user?.name}</h3>
                    <p className=' font-semibold'>{comment.content}</p>
                    <p className='text-sm text-gray-400 ml-5'>{calculateTimeAgo(comment.createdAt)}</p>
                </div>
            ))}
        </div>
    );
}

export default Post;
