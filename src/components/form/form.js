import React, {Fragment, Component} from "react";

import PopupText from "../popupText";
import PopupBtn from "../popupBtn";
import FormErrors from "../formErrors";

import '../CSSVariables/variables.css';
import './form.css';


export default class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            show: false,
            nameId: false,
            phoneId: false,
            formValid: false,
            nameValid: false,
            phoneValid: false,
            emailValid: false,
            showMirageText: false,
            nameIdPlaceholder: false,
            phoneIdPlaceholder: false
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



    validateField = (fieldName, value) => {
        let {nameValid, phoneValid, emailValid, formErrors, name} = this.state;
        // let fieldValidationErrors = this.state.formErrors;
        // let nameValid = this.state.nameValid;
        // let phoneValid = this.state.phoneValid;
        // let emailValid = this.state.emailValid;

        const nameFormat = '/^[a-zA-Zа-яА-Я ]{2,30}$/';
        const phoneFormat = /^\+?([3-8]{2})\)?([0-9]{10})$/;
        const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        switch (fieldName) {
            case 'name':
                // nameValid = value.match(nameFormat);
                console.log(value.match(nameFormat));
                // formErrors.name =
                nameValid ?
                    this.setState(({nameId, nameIdPlaceholder}) => {
                        return {
                            nameId: !nameId,
                            nameIdPlaceholder: !nameIdPlaceholder
                        }
                    }) :
                    this.setState(({nameId, nameIdPlaceholder}) => {
                        return {
                            nameId: nameId,
                            nameIdPlaceholder: nameIdPlaceholder
                        }
                    });
                console.log(name);
                break;
            case 'phone':
                phoneValid = value.match(phoneFormat);
                this.setState(({phoneId, phoneIdPlaceholder}) => {
                    return {
                        phoneId: !phoneId,
                        phoneIdPlaceholder: !phoneIdPlaceholder
                    }
                });
                break;
            case 'email':
                emailValid = value.match(mailFormat);
                // formErrors.email = emailValid ? '' : ' is invalid';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: formErrors,
            nameValid: nameValid,
            phoneValid: phoneValid,
            emailValid: emailValid
        },
            this.validateForm);
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
        const { nameValid, phoneValid, emailValid } = this.state;
        this.setState({
            formValid: nameValid && phoneValid && emailValid
        })
    };

    onMirageText = () => {
        setTimeout(() => {
            this.setState(({showMirageText}) => {
                return {
                    showMirageText: true
                }
            })
        }, 750);

        setTimeout(() => {
            this.setState(({showMirageText}) => {
                return {
                    showMirageText: false
                }
            })
        }, 2000)
    };

    onHideModal = () => {
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const company = document.getElementById('company');

        const elems = [name, phone, email, company];

        if (this.validateForm) {
            setTimeout(() => {
                this.onMirageText();
                this.setState(({show}) => {
                    return {
                        show: !show
                    }
                })
            }, 1500);
        }

    };

    render() {

        const {
            show,
            name,
            phone,
            email,
            nameId,
            company,
            comment,
            phoneId,
            formValid,
            formErrors,
            showMirageText,
            nameIdPlaceholder,
            phoneIdPlaceholder
        } = this.state;

        let formContainerClassNames = 'form-main';
        let popupMirageText = 'popup-text-container';
        let nameValidateClass = 'name';
        let nameValidateClassPlaceholder = 'validate[required,custom[onlyLetter],length[0,100]] feedback-input';
        let phoneValidateClass = 'phone';
        let phoneValidateClassPlaceholder = 'validate[required,custom[phone]] feedback-input';

        show ? formContainerClassNames += ' show-modal' : formContainerClassNames = 'form-main';
        showMirageText ? popupMirageText += ' popup-up' : popupMirageText = 'popup-text-container';
        nameId ? nameValidateClass += ' border' : nameValidateClass = 'name';
        // nameId ?
        //     (nameValidateClass += ' border') && (nameValidateClassPlaceholder += ' error-box-form') :
        //     (nameValidateClass = 'name') && (nameValidateClassPlaceholder = 'validate[required,custom[onlyLetter],length[0,100]] feedback-input');
        nameIdPlaceholder ? nameValidateClassPlaceholder += ' error-box-form' : nameValidateClassPlaceholder = 'validate[required,custom[onlyLetter],length[0,100]] feedback-input';
        phoneId ? phoneValidateClass += ' border' : phoneValidateClass = 'phone';
        phoneIdPlaceholder ? phoneValidateClassPlaceholder += ' error-box-form' : phoneValidateClassPlaceholder = 'validate[required,custom[phone]] feedback-input';


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

                                <p className={nameValidateClass}>
                                    <label htmlFor='name'>
                                        <i className='fas fa-user fa-2x' />
                                    </label>
                                    <input
                                        type='text'
                                        name='name'
                                        className={nameValidateClassPlaceholder}
                                        placeholder='ФИО*'
                                        id='name'
                                        value={name}
                                        onChange={this.handleUserInput}
                                        required
                                    />
                                </p>

                                <p className={phoneValidateClass}>
                                    <label htmlFor='phone'>
                                        <i className='fas fa-phone-alt fa-2x' />
                                    </label>
                                    <input
                                        type='text'
                                        name='phone'
                                        className={phoneValidateClassPlaceholder}
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
                                        type='submit'
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

                <div className={popupMirageText}>
                    <div id="popup-text" className="popup-text">
                        <p>
                            Наши специалисты свяжутся с Вами в ближайшее время
                        </p>
                    </div>
                </div>

            </Fragment>
        )
    }
};