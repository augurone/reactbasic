import React from 'react';
import PropTypes from 'prop-types';
import UserImg from './UsrImg';

const Comments = ({ posts = [] }) => {
    if (!posts.length) return null;

    return (
        <section className="postMachine-Form--comment">
            {posts.map(
                ({
                    user: { img = '', name = '' } = {},
                    timeStamp = '',
                    text = '',
                }) => {
                    const readableDate = new Date(timeStamp).toString();

                    return (
                        <article
                            className="postMachine-Post"
                            key={Math.random()}>
                            <UserImg img={img} name={name} />
                            <div className="postMachine-Post--content">
                                <section className="postMachine-HeaderGroup">
                                    <h3>{name}</h3>
                                    <span className="u-timeStamp">
                                        {readableDate}
                                    </span>
                                </section>
                                <section className="postMachine-PostText">
                                    {text}
                                </section>
                            </div>
                        </article>
                    );
                },
            )}
        </section>
    );
};

export default Comments;

Comments.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
