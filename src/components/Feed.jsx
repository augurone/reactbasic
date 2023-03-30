import React, { useEffect, useState } from 'react';
import CommentsForm from './CommentsForm';
import Comments from './Comments';

const userData = [
    {
        name: 'Chad Augur',
        img: 'https://avatars.githubusercontent.com/u/4624449?s=400&u=f5eb7c10761bba043e459d5dc89b57592bd29d91&v=4',
    },
    {
        name: 'Billie Austin',
        img: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/241086093_626259035402363_2328464502435350005_n.jpg',
    },
];

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const handlePostSubmit = (formData) => {
        const comment = formData.get('comment');

        if (!comment) return;

        const newPost = {
            user: {
                img: currentUser.img,
                name: currentUser.name,
            },
            timeStamp: Date.now(),
            text: comment,
        };

        setPosts((lastState) => [].concat(lastState, newPost));
    };

    useEffect(() => {
        if (!currentUser.name) setCurrentUser(userData[0]);
    }, []);

    return (
        <section className="postMachine-Feed u-flexContainer u-flexCentered  u-flexDirection--column">
            <h2 className="u-flexAlignSelf--start">Comments</h2>
            <CommentsForm user={currentUser} handleSubmit={handlePostSubmit} />
            <Comments posts={posts} />
        </section>
    );
};

export default Feed;
