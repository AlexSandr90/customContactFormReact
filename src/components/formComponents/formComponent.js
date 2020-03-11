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
            <React.Fragment>
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

        {/*<FormComponent*/}
        {/*    pClassName='name'*/}
        {/*    htmlFor='name'*/}
        {/*    fontAwesomeClassName='fas fa-user fa-2x'*/}
        {/*    type='text'*/}
        {/*    name='name'*/}
        {/*    inputClassName='validate[required,custom[onlyLetter],length[0,100]] feedback-input'*/}
        {/*    placeholder='ФИО*'*/}
        {/*    id='name'*/}
        {/*    required*/}
        {/*/>*/}

        {/*<FormComponent*/}
        {/*    pClassName='phone'*/}
        {/*    htmlFor='phone'*/}
        {/*    fontAwesomeClassName='fas fa-phone-alt fa-2x'*/}
        {/*    type='text'*/}
        {/*    name='phone'*/}
        {/*    inputClassName='validate[required,custom[phone]] feedback-input'*/}
        {/*    placeholder='Телефон (+380 хххх хх хх)*'*/}
        {/*    id='phone'*/}
        {/*    required*/}
        {/*/>*/}

        {/*<FormComponent*/}
        {/*    pClassName='email'*/}
        {/*    htmlFor='email'*/}
        {/*    fontAwesomeClassName='fas fa-envelope fa-2x'*/}
        {/*    type='email'*/}
        {/*    name='email'*/}
        {/*    inputClassName='validate[required,custom[email]] feedback-input'*/}
        {/*    placeholder='Электронная почта*'*/}
        {/*    id='email'*/}
        {/*    required*/}
        {/*/>*/}

                {/*<FormComponent*/}
                {/*    pClassName='company'*/}
                {/*    htmlFor='company'*/}
                {/*    fontAwesomeClassName='fas fa-home fa-2x'*/}
                {/*    type='text'*/}
                {/*    name='company'*/}
                {/*    inputClassName='company validate[required,custom[email]] feedback-input'*/}
                {/*    placeholder='Ваша компания'*/}
                {/*    id='company'*/}

                {/*/>*/}


            </React.Fragment>
        )
    }
};