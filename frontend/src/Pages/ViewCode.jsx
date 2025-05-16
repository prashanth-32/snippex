import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import useAuth from "../Hooks/useAuth.js"

const ViewCode = () => {
    const { id } = useParams();
    const [snippet, setSnippet] = useState({});
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [render, setRender] = useState(false);
    const { user } = useAuth();
    const [redirect, setRedirect] = useState(false);

    const format = (s) => {
        if (!s) return "Unknown";
        let [date, time] = s.split('T');
        let [y, m, d] = date.split('-');
        let a = "AM";
        let [hr, mn] = time.split(':');
        hr = parseInt(hr);
        if (hr >= 12) {
            a = "PM";
            hr = hr > 12 ? hr % 12 : hr;
        }
        return `${d}-${m}-${y} at ${hr}:${mn} ${a}`;
    };
    const [copyStatus, setCopyStatus] = useState('Copy');

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(snippet.code || '');
            setCopyStatus('Copied!');
            setTimeout(() => setCopyStatus('Copy'), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const addComment = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/snippets/postComment', { postId: id, username: user.username, comment }, { withCredentials: true });
            // console.log(res);
            setRender(() => true);
            setComment('');
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/snippets/${id}`, { withCredentials: true });
                setSnippet(data[0]);
                const res = await axios.get(`http://localhost:4000/snippets/comments/${id}`, { withCredentials: true });
                // console.log(res);
                setComments(res.data);
            } catch (err) {
                console.log("Error while loading post", err);
            }
        };
        getData();
    }, [render]);

    const deleteSnippet = async (e) => {
        try {
            const res = await axios.delete(`http://localhost:4000/snippets/${id}`, { withCredentials: true });
            // console.log(res);
            setRedirect(true);
        }
        catch (err) {
            console.log(err);
        }
    }
    if (redirect)
        return <Navigate to={'/'} />

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 space-y-6">

                {/* Title */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-800 underline underline-offset-8 decoration-blue-500">{snippet.name}</h1>
                </div>

                {/* Language */}
                <div className="flex justify-center">
                    <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium tracking-wide">
                        Language: {snippet.language}
                    </span>
                </div>

                {/* Code Block */}
                <div className="relative">
                    {/* Copy Button */}
                    <button
                        onClick={handleCopy}
                        className="absolute right-4 top-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md shadow transition"
                    >
                        {copyStatus}
                    </button>

                    {/* Code Block */}
                    <textarea
                        value={snippet.code || ''}
                        rows={20}
                        readOnly
                        className="w-full rounded-xl border border-gray-300 p-4 font-mono text-sm bg-gray-50 resize-none shadow-inner"
                    />
                </div>


                {/* Description */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-md">
                    <h2 className="text-lg font-semibold text-yellow-700 mb-2">Description</h2>
                    <p className="text-gray-700">{snippet.description}</p>
                </div>

                {/* Author Info */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-md">
                    <h2 className="text-lg font-semibold text-blue-700 mb-2">Author Info</h2>
                    <p className="text-gray-700">
                        <span className="font-semibold text-blue-800 text-2xl"> {snippet.author || "Unknown"}</span>
                    </p>
                    <p className="text-gray-600 mt-1">
                        <span className="font-medium text-gray-700">Created at : </span> {format(snippet.createdAt)}
                    </p>
                </div>
                <div className="flex gap-4 mt-4">
                    {
                        snippet.author === user.username && <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                            <Link to={`/edit/${id}`}>Edit</Link>
                        </button>
                    }
                    {
                        snippet.author === user.username && <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200" onClick={(e) => deleteSnippet(e)}>
                            Delete
                        </button>
                    }
                </div>
                {/* Add Comment */}
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={(e) => addComment(e)}>
                        Add
                    </button>
                </div>


                {/* Comments */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Comments:</h1>
                    <div className="space-y-3">
                        {comments.length > 0 ? (
                            comments.map((c, idx) => (
                                <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                    <p className="text-sm font-semibold text-gray-700">Author: {c.username || "Anonymous"}</p>
                                    <p className="text-gray-600 mt-1">{c.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">No comments yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCode;
