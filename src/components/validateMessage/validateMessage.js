import React from "react";

import './validateMessage.css';

const ValidateMessage = props => {
    return props.valid ? null : <div className='error-msg' >{ props.message }</div>
};

export default ValidateMessage;
