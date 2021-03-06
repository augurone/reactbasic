import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import UserImg from './UserImg';

const CommentsForm = ({
    handleSubmit,
    user: {
        img = '',
        name = '',
    } = {},
}) => {
    const formRef = useRef();

    const localSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(formRef.current);

        handleSubmit(formData);

        formRef.current.reset();
    };

    return (
        <section className="postMachine-Form--comment u-flexContainer">
            <form onSubmit={localSubmit} ref={formRef}>
                <UserImg img={img} name={name} />
                <textarea
                    placeholder="What is a question you have?"
                    name="comment" />
                <button
                    aria-label="Post Comment"
                    className="postMachine-Button--post"
                    name="post"
                    type="submit">
                    Post A Comment
                </button>
            </form>
        </section>
    );
};

export default CommentsForm;

CommentsForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    user: PropTypes.shape({
        img: PropTypes.string,
        name: PropTypes.string,
    }).isRequired,
};
