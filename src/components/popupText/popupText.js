import React from "react";

import './popupText.css';

const PopupText = props => {
    return (
        <div id="popup-text-container" className="popup-text-container">
            <div id="popup-text" className="popup-text">
                <p>
                    { props.text }
                </p>
            </div>
        </div>
    )
};
export default PopupText;