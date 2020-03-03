import React, { Fragment, Component } from "react";

import PopupBtn from "../popupBtn";
import PopupText from "../popupText";
import FormComponent from '../formComponents';


import '../CSSVariables/variables.css';
import './form.css';


export default class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    onShowModal = () => {
        setTimeout(() => {
            this.setState( ({ show }) => {
                    return {
                        show: !show
                    }
                })
            }, 1500)
    };

    // onHideModal = () => {
    //     setTimeout(() => {
    //         this.setState( ({ show }) => {
    //             return {
    //                 show: !show
    //             }
    //         })
    //     }, 1500)
    // };

    render() {

        const { show } = this.state;
        let formContainerClassNames = 'form-main';

        show ? formContainerClassNames += ' show-modal' : formContainerClassNames = 'form-main';

        return (
            <Fragment>
                <div className="container-wrap">

                    <input
                        type='button'
                        id='popup-toggle'
                        className='popup-toggle'
                        value='Узнать цену'
                        onClick={ this.onShowModal }
                    />

                    <div id='form-main' className={formContainerClassNames}>
                        <div id='form-container' className='form-container'>
                            <div id='close' className='close' />
                            <form id='form' className='form'>

                                <FormComponent
                                    pClassName='name'
                                    htmlFor='name'
                                    fontAwesomeClassName='fas fa-user fa-2x'
                                    type='text'
                                    name='name'
                                    inputClassName='validate[required,custom[onlyLetter],length[0,100]] feedback-input'
                                    placeholder='ФИО*'
                                    id='name'
                                    required
                                />


                                <FormComponent
                                    pClassName='phone'
                                    htmlFor='phone'
                                    fontAwesomeClassName='fas fa-phone-alt fa-2x'
                                    type='text'
                                    name='phone'
                                    inputClassName='validate[required,custom[phone]] feedback-input'
                                    placeholder='Телефон (+380 хххх хх хх)*'
                                    id='phone'
                                    required
                                />

                                <FormComponent
                                    pClassName='email'
                                    htmlFor='email'
                                    fontAwesomeClassName='fas fa-envelope fa-2x'
                                    type='text'
                                    name='email'
                                    inputClassName='validate[required,custom[email]] feedback-input'
                                    placeholder='Электронная почта*'
                                    id='email'
                                    required
                                />

                                <FormComponent
                                    pClassName='company'
                                    htmlFor='company'
                                    fontAwesomeClassName='fas fa-home fa-2x'
                                    type='text'
                                    name='company'
                                    inputClassName='company validate[required,custom[email]] feedback-input'
                                    placeholder='Ваша компания'
                                    id='company'

                                />

                                <p className='text'>
                                <textarea
                                    name='text'
                                    className='validate[required,length[6,300]] feedback-input'
                                    id='text'
                                    placeholder='Комментарий'
                                />
                                </p>

                                <div className='submit'>
                                    <input
                                        type='button'
                                        id='button-blue'
                                        className='button-blue'
                                        value='Получить цену'
                                        onClick={ this.onShowModal }
                                    />
                                    <div className='ease' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <PopupText text='Наши специалисты свяжутся с Вами в ближайшее время' />
            </Fragment>
        )
    }
};