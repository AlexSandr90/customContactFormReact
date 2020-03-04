import React, { Fragment, Component } from "react";

import PopupBtn from "../popupBtn";
import PopupText from "../popupText";
import FormComponent from '../formComponents';

import {
    addClass,
    resetValue,
    removeClass,
    toggleClass,
    itemValidate,
    onMirageText,
    removeClassErrors
} from '../helpers'

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

    addClass = (el, className) => {
        el.classList.add(className);
    };

    removeClass = (el, className) => {
        el.classList.remove(className);
    };

    toggleClass = (el, className) => {
        el.classList.toggle(className);
    };

    itemValidate = (item, itemFormat, itemFocus, placeholderValue, className = 'error-box-form') => {

        if (item.value.match(itemFormat)) {
            itemFocus.focus();
            return true
        }

        itemFocus.focus();
        item.placeholder = placeholderValue;
        item.classList.add(className);
        return false;
    };

    removeClassErrors = (className, ...elements) => {
        const el = [...elements];
        el.forEach(item => this.removeClass(item, className));
    };

    resetValue = elements => elements.forEach(item => item.value = '');

    submitForm = () => event => {
        event.preventDefault();

        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const company = document.getElementById('company');

        const faidText = document.getElementById('popup-text-container');
        const formMain = document.getElementById('form-main');

        const close = document.getElementById('close');

        const nameFormat = /^[a-zA-Zа-яА-Я ]{2,30}$/;
        const phoneFormat = /^\+?([3-8]{2})\)?([0-9]{10})$/;
        const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const nameChecked = this.itemValidate(name, nameFormat, document.contactForm.name, 'Невірний формат даних');
        const phoneChecked = this.itemValidate(phone, phoneFormat, document.contactForm.phone, 'Невірний формат номеру');
        const emailChecked = this.itemValidate(email, mailFormat, document.contactForm.email, 'Невірний формат пошти');

        const elements = [name, phone, email, company];

        if (nameChecked && phoneChecked && emailChecked) {
            this.onMirageText(faidText, 'popup-up', 750, 2000);
            this.removeClassErrors('error-box-form', name, phone, email, company);
            setTimeout(() => this.toggleClass(formMain, 'show-modal', 500));
            this.resetValue(elements);
        }

    };

    onMirageText = (el, className, addTime, removeTime) => {
        setTimeout(() => this.addClass(el, className), addTime);
        setTimeout(() => this.removeClass(el, className), removeTime);
    };

    onHideModal = () => {
        const faidText = document.getElementById('popup-text-container');
        this.submitForm();
        this.onMirageText(faidText, 'popup-up', 750, 2000);
        setTimeout(() => {
            this.setState( ({ show }) => {
                return {
                    show: !show
                }
            })
        }, 1500)
    };

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
                                        onClick={ this.onHideModal }
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