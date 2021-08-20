import React from 'react';
import PropTypes from 'prop-types';

const UserImg = ({
    img = '',
    name = '',
}) => (
    <img className="postMachine-Img--user" alt={name} src={img} />
);

export default UserImg;

UserImg.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};
