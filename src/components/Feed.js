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
        img: 'https://scontent-hou1-1.xx.fbcdn.net/v/t1.6435-9/211640909_588481642513436_807568501449669370_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Vm9_MTJagl8AX9n2-Sq&_nc_ht=scontent-hou1-1.xx&oh=afc2460a51fdfa61a3c825bfa87691d4&oe=6144BED4',
    },
];

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const handlePostSubmit = (formData) => {
        const newPost = {
            user: {
                img: currentUser.img,
                name: currentUser.name,
            },
            timeStamp: Date.now(),
            text: formData.get('comment'),
        };

        setPosts((lastState) => [].concat(lastState, newPost));
    };

    useEffect(() => {
        if (!currentUser.name) setCurrentUser(userData[0]);
    }, []);

    return (
        <div className="postMachine-Feed u-flexContainer u-flexCentered">
            <div className="postMachine-Feed--inner u-flexContainer u-flexCentered u-flexDirection--column">
                <h2 className="u-flexAlignSelf--start">Comments</h2>
                <CommentsForm
                    user={currentUser}
                    handleSubmit={handlePostSubmit} />
                <Comments posts={posts} />
            </div>
        </div>
    );
};

export default Feed;
