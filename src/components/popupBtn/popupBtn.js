import React, { Component } from "react";

import './popupBtn.css';

export default class PopupBtn extends Component {


    render() {
        const { value } = this.props;

        return (
            <input
                type='button'
                id='popup-toggle'
                className='popup-toggle'
                value={ value }
                onClick={this.onClick}
            />
        );
    }
};