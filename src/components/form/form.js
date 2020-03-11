import React, {Fragment, Component} from "react";

import PopupText from "../popupText";
import PopupBtn from "../popupBtn";
import FormComponent from '../formComponents';
import FormErrors from "../formErrors";
import Helpers from "../helpers";

import '../CSSVariables/variables.css';
import './form.css';


export default class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: '',
            phone: '',
            email: '',
            company: '',
            comment: '',
            formErrors: {
                name: '',
                phone: '',
                email: '',
            },
            nameValid: false,
            phoneValid: false,
            emailValid: false,
            formValid: false
        };
    }

    onShowModal = () => {
        setTimeout(() => {
            this.setState(({show}) => {
                return {
                    show: !show
                }
            })
        }, 1500)
    };

    handleUserInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
                [name]: value
            },
            () => { this.validateField(name, value) });
    };

    validateForm = () => {
        this.setState({
            formValid: this.state.nameValid && this.state.phoneValid && this.state.emailValid
        })
    };

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let phoneValid = this.state.phoneValid;
        let emailValid = this.state.emailValid;

        const nameFormat = /^[a-zA-Zа-яА-Я ]{2,30}$/;
        const phoneFormat = /^\+?([3-8]{2})\)?([0-9]{10})$/;
        const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (fieldName === 'name') {
            nameValid = value.match(nameFormat);
            fieldValidationErrors.name = nameValid ? '' : ' is invalid';
        } else if (fieldName === 'phone') {

            phoneValid = value.match(phoneFormat);
            fieldValidationErrors.phone = phoneValid ? '' : ' is invalid';
        } else if (fieldName === 'email') {
            // eslint-disable-next-line no-useless-escape
            emailValid = value.match(mailFormat);
            fieldValidationErrors = emailValid ? '' : ' is invalid';
        } else {
        }

        this.setState({
            formErrors: fieldValidationErrors,
            nameValid: nameValid,
            phoneValid: phoneValid,
            emailValid: emailValid
        },
            this.validateForm);
    };



    onHideModal = () => {
        const faidText = document.getElementById('popup-text-container');
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const company = document.getElementById('company');
        // this.submitForm('click');
        // this.onMirageText(faidText, 'popup-up', 750, 2000);


        const elems = [name, phone, email, company];

        setTimeout(() => {
            this.onMirageText(this.faidText, 'popup-up', 750, 2000);
            this.setState(({show}) => {
                return {
                    show: !show
                }
            })
        }, 1500);

        // if (this.formValidate) {
        //     this.onMirageText(this.faidText, 'popup-up', 750, 2000);
        //     this.removeClassErrors('error-box-form', name, phone, email, company);
        //     setTimeout(() => {
        //         this.setState(({show}) => {
        //             return {
        //                 show: !show
        //             }
        //         })
        //     }, 1500);
        //     console.log(this.formValidate());
        //
        //     this.resetValue(elems);
        // }
        //
        // console.log(this.formValidate());
    };

    render() {

        const {
            show,
            name,
            phone,
            email,
            company,
            comment,
            formValid,
            formErrors
        } = this.state;

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
                        onClick={this.onShowModal}
                    />

                    <div id='form-main' className={formContainerClassNames}>
                        <div id='form-container' className='form-container'>
                            <div id='close' className='close'/>

                            <form id='form' className='form' name='contactForm'>

                                <div className='panel panel-default'>
                                    <FormErrors formErrors={formErrors} />
                                </div>

                                <p className='name'>
                                    <label htmlFor='name'>
                                        <i className='fas fa-user fa-2x' />
                                    </label>
                                    <input
                                        type='text'
                                        name='name'
                                        className='validate[required,custom[onlyLetter],length[0,100]] feedback-input'
                                        placeholder='ФИО*'
                                        id='name'
                                        value={name}
                                        onChange={this.handleUserInput}
                                        required
                                    />
                                </p>

                                <p className='phone'>
                                    <label htmlFor='phone'>
                                        <i className='fas fa-phone-alt fa-2x' />
                                    </label>
                                    <input
                                        type='text'
                                        name='phone'
                                        className='validate[required,custom[phone]] feedback-input'
                                        placeholder='Телефон (+380 хххх хх хх)*'
                                        id='phone'
                                        value={phone}
                                        onChange={this.handleUserInput}
                                        required
                                    />
                                </p>

                                <p className='email'>
                                    <label htmlFor='email'>
                                        <i className='fas fa-phone-alt fa-2x' />
                                    </label>
                                    <input
                                        type='email'
                                        name='email'
                                        className='validate[required,custom[email]] feedback-input'
                                        placeholder='Электронная почта*'
                                        id='email'
                                        value={email}
                                        onChange={this.handleUserInput}
                                        required
                                    />
                                </p>

                                <p className='company'>
                                    <label htmlFor='company'>
                                        <i className='fas fa-home fa-2x' />
                                    </label>
                                    <input
                                        type='text'
                                        name='company'
                                        className='company validate[required,custom[email]] feedback-input'
                                        placeholder='Ваша компания'
                                        id='company'
                                        value={company}
                                        onChange={this.handleUserInput}
                                    />
                                </p>


                                <p className='text'>
                                <textarea
                                    name='text'
                                    className='validate[required,length[6,300]] feedback-input'
                                    id='text'
                                    placeholder='Комментарий'
                                    value={comment}
                                    onChange={this.handleUserInput}
                                />
                                </p>

                                <div className='submit'>
                                    <input
                                        type='button'
                                        id='button-blue'
                                        className='button-blue'
                                        value='Получить цену'
                                        onClick={this.onHideModal}
                                        disabled={ !formValid }
                                    />
                                    <div className='ease'/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <PopupText text='Наши специалисты свяжутся с Вами в ближайшее время'/>
            </Fragment>
        )
    }
};