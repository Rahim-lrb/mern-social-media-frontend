import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import { UserContext } from '../contexts/authContext';


Modal.setAppElement('#root');

const MyModal = ({ isOpen, toggleModal, addPost }) => {
    const { currentUser } = useContext(UserContext)
    const [ postData, setPostData ] = useState({ title: '', content: '', image: null});

    const handleInputChange = (e) => {
        if (e.target.name === 'image') {
            setPostData({
                ...postData,
                image: e.target.files[0]
            });
        } else {
            setPostData({
                ...postData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userId", currentUser._id);
        formData.append("title", postData.title);
        formData.append("content", postData.content);
        formData.append("file", postData.image);
        try {
            await addPost(formData);
            toggleModal();
            setPostData({ title: '', content: '', image: null})
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel="Create New Post Modal"
            className="flex justify-center items-center"
            overlayClassName="fixed inset-0 flex justify-center items-center"
            style={{
                content: {
                    width: '600px',
                }
            }}
        >
            <div className="relative p-4 w-full z-50">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900">Create New Post</h3>
                        <button onClick={toggleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4">
                            <div>
                                <label htmlFor="postName" className="block mb-2 text-sm font-medium text-gray-900">Post Name</label>
                                <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-zinc-400" placeholder="Enter post name" required="" value={postData.title} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <textarea id="content" name="content" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-zinc-400" placeholder="Write post description here" value={postData.content} onChange={handleInputChange}></textarea>
                            </div>
                            <div>
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                                <input type="file" id="image" name="image" accept="image/*" onChange={handleInputChange} className="hidden" />
                                <label htmlFor="image" className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-500 inline-block">Upload Image</label>
                            </div>
                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Add new post
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default MyModal;
