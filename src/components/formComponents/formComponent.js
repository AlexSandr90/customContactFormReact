import React, { Component } from "react";

import './formComponent.css';

export default class FormComponent extends Component {

    render() {
        const {
            pClassName,
            htmlFor,
            fontAwesomeClassName,
            type,
            name,
            inputClassName,
            placeholder,
            id,
            required = false
        } = this.props;

        return (
            <p className={ pClassName }>
                <label htmlFor={ htmlFor }>
                    <i className={ fontAwesomeClassName } />
                </label>
                <input
                    type={ type }
                    name={ name }
                    className={ inputClassName }
                    placeholder={ placeholder }
                    id={ id }
                    required={ required }
                />
            </p>
        )
    }
};