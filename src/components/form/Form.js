import React, {Fragment, Component} from "react";

import PopupText from "../popupText";
import PopupBtn from "../popupBtn";
import FormErrors from "../formErrors";

import '../CSSVariables/variables.css';
import './form.css';
import ValidateMessage from "../validateMessage";

export default class Form extends Component {

    state = {
        phone: '',
        email: '',
        company: '',
        comment: '',
        username: '',
        errorMsg: {},
        formValid: false,
        emailValid: false,
        phoneValid: false,
        usernameValid: false,


        show: false,
        nameId: false,
        phoneId: false,
        showMirageText: false,
        nameIdPlaceholder: false,
        phoneIdPlaceholder: false
    };

    onShowModal = () => {
        setTimeout(() => {
            this.setState(({show}) => {
                return {
                    show: !show
                }
            })
        }, 200)
    };


    validateForm = () => {
        const {
            emailValid,
            phoneValid,
            usernameValid
        } = this.state;
        this.setState({
            formValid: emailValid && phoneValid && usernameValid
        })
    };

    validateUserName = () => {
        const { username } = this.state;
        let usernameValid = true;
        let errorMsg = {...this.state.errorMsg};
        const usernamePattern = /^[a-zA-Zа-яА-Я ]{3,30}$/;

        if (username.length < 3 && username.length > 20) {
            usernameValid = false;
            errorMsg.username = 'Must be at lest 3 to 20 characters long'
        } else if (!usernamePattern.test(username)) {
            usernameValid = false;
            errorMsg.username = 'Invalid name format'
        }

        this.setState({usernameValid, errorMsg}, this.validateForm)
    };

    updateUserName = username => {
        this.setState({username}, this.validateUserName);
    };

    validateEmail = () => {
        const { email } = this.state;
        let emailValid = true;
        let errorMsg = {...this.state.errorMsg};
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailPattern.test(email)) {
            emailValid = false;
            errorMsg.email = 'Email must be contain @'
        }

        this.setState({emailValid, errorMsg}, this.validateForm)
    };

    updateEmail = email => {
        this.setState({email}, this.validateEmail)
    };

    validatePhoneNumber = () => {
        const { phone } = this.state;
        let phoneValid = true;
        let errorMsg = {...this.state.errorMsg};
        const phonePattern = /^\+?([3-8]{2})\)?([0-9]{10})$/;

       if (!phonePattern.test(phone)) {
            phoneValid = false;
            errorMsg.phone = 'Please, enter phone in format +380xxxxxxxxx and length at 13 characters';
        }


        this.setState({phoneValid, errorMsg}, this.validateForm)
    };

    updatePhoneNumber = phone => {
        this.setState({phone}, this.validatePhoneNumber)
    };

    updateCompanyName = company => {
        this.setState({company})
    };

    updateComment = comment => {
        this.setState({comment})
    };


    validateField = (fieldName, value) => {
        const {
            name,
            nameValid,
            phoneValid,
            emailValid,
            formErrors
        } = this.state;
        const nameFormat = /^[a-zA-Zа-яА-Я ]{2,30}$/;
        const phoneFormat = /^\+?([3-8]{2})\)?([0-9]{10})$/;
        const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        switch (fieldName) {
            case 'name':
                console.log(value.match(nameFormat));
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
                this.phoneValid = value.match(phoneFormat);
                this.setState(({phoneId, phoneIdPlaceholder}) => {
                    return {
                        phoneId: !phoneId,
                        phoneIdPlaceholder: !phoneIdPlaceholder
                    }
                });
                break;
            case 'email':
                this.emailValid = value.match(mailFormat);
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

    onHideModalSubmit = () => {

        if (this.validateForm) {
            setTimeout(() => {
                this.onMirageText();
                this.setState(({show}) => {
                    return {
                        show: !show
                    }
                })
            }, 200);
        }

    };

    onHideModalClose = () => {
        this.setState(({show}) => {
            return {
                show: !show
            }
        })
    };

    render() {

        const {
            email,
            phone,
            company,
            comment,
            username,
            errorMsg,
            formValid,
            phoneValid,
            emailValid,
            usernameValid,

            show,
            nameId,
            phoneId,
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
        nameId ?
            (nameValidateClass += ' border') && (nameValidateClassPlaceholder += ' error-box-form') :
            (nameValidateClass = 'name') && (nameValidateClassPlaceholder = 'validate[required,custom[onlyLetter],length[0,100]] feedback-input');
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
                            <div id='close' className='close' onClick={this.onHideModalClose}/>

                            <form id='form' className='form' name='contactForm'>

                                {/*<div className='panel panel-default'>*/}
                                {/*    <FormErrors formErrors={formErrors} />*/}
                                {/*</div>*/}

                                <p className={nameValidateClass}>
                                    <label htmlFor='username'>
                                        <i className='fas fa-user fa-2x' />
                                    </label>
                                    <ValidateMessage valid={usernameValid}
                                                     message={errorMsg.username}
                                    />
                                    <input
                                        type='text'
                                        name='name'
                                        className={nameValidateClassPlaceholder}
                                        placeholder='ФИО*'
                                        id='username'
                                        value={username}
                                        onChange={e => this.updateUserName(e.target.value)}
                                        required
                                    />
                                </p>

                                <p className={phoneValidateClass}>
                                    <label htmlFor='phone'>
                                        <i className='fas fa-phone-alt fa-2x' />
                                    </label>
                                    <ValidateMessage valid={phoneValid}
                                                     message={errorMsg.phone}
                                    />
                                    <input
                                        type='text'
                                        name='phone'
                                        className={phoneValidateClassPlaceholder}
                                        placeholder='Телефон (+380 хххх хх хх)*'
                                        id='phone'
                                        value={phone}
                                        onChange={e => this.updatePhoneNumber(e.target.value)}
                                        required
                                    />
                                </p>

                                <p className='email'>
                                    <label htmlFor='email'>
                                        <i className='fas fa-phone-alt fa-2x' />
                                    </label>
                                    <ValidateMessage valid={emailValid}
                                                     message={errorMsg.email}
                                    />
                                    <input
                                        type='email'
                                        name='email'
                                        className='validate[required,custom[email]] feedback-input'
                                        placeholder='Электронная почта*'
                                        id='email'
                                        value={email}
                                        onChange={e => this.updateEmail(e.target.value)}
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
                                        onChange={e => this.updateCompanyName(e.target.value)}
                                    />
                                </p>


                                <p className='text'>
                                <textarea
                                    name='text'
                                    className='validate[required,length[6,300]] feedback-input'
                                    id='text'
                                    placeholder='Комментарий'
                                    value={comment}
                                    onChange={e => this.updateComment(e.target.value)}
                                />
                                </p>

                                <div className='submit'>
                                    <input
                                        type='submit'
                                        id='button-blue'
                                        className='button-blue'
                                        value='Получить цену'
                                        onClick={this.onHideModalSubmit}
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
