import React from "react";

import './validateMessage.css';

const ValidateMessage = props => {
    return props.valid ? <p className='error-msg'>{}</p> : <p className='error-msg' >{ props.message }</p>
};

export default ValidateMessage;
