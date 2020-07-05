import React, {Component} from "react";

import PopupBtn from "../popupBtn";

import '../CSSVariables/variables.css';
import './form.css';
import '../popupText/popupText.css'
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

        if (username.length < 3 && username.length > 30) {
            usernameValid = false;
            errorMsg.username = 'Must be at lest 3 to 30 characters long'
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

    onMirageText = () => {
        setTimeout(() => {
            this.setState(({showMirageText}) => {
                return {
                    showMirageText: true
                }
            });
        }, 150);

        setTimeout(() => {
            this.setState(({showMirageText}) => {
                return {
                    showMirageText: false
                }
            });
        }, 2000)
    };

    onHideModalSubmitBtn = () => {

        if (this.validateForm) {
            this.onMirageText();
            alert('showMirageText before:', this.showMirageText);
            setTimeout(() => {
                this.setState(({show}) => {
                    return {
                        show: !show,
                    }
                })
            }, 200);
            alert('showMirageText after:', this.showMirageText);
        }

    };

    onHideModalCloseBtn = () => {
        this.setState(({show}) => {
            return {
                show: !show
            }
        })
    };

    onHideBg = () => {
        this.setState(({show}) => {
            return {
                show: !show
            }
        })
    };

    render() {

        const {
            show,
            email,
            phone,
            company,
            comment,
            phoneId,
            username,
            errorMsg,
            formValid,
            phoneValid,
            emailValid,
            usernameValid,
            showMirageText,
            nameIdPlaceholder,
            phoneIdPlaceholder
        } = this.state;

        let formContainerClassNames = 'form-main';
        let popupMirageText = 'popup-text-container';
        let nameValidateClass = 'name';
        let nameValidateClassPlaceholder = 'feedback-input';
        let phoneValidateClass = 'phone';
        let phoneValidateClassPlaceholder = 'feedback-input';

        show ?
            formContainerClassNames += ' show-modal' :
            formContainerClassNames = 'form-main';

        showMirageText ?
            popupMirageText += ' popup-up' :
            popupMirageText = 'popup-text-container';

        nameIdPlaceholder ?
            nameValidateClassPlaceholder += ' error-box-form' :
            nameValidateClassPlaceholder = 'feedback-input';

        phoneId ? phoneValidateClass += ' border' : phoneValidateClass = 'phone';

        phoneIdPlaceholder ?
            phoneValidateClassPlaceholder += ' error-box-form' :
            phoneValidateClassPlaceholder = 'feedback-input';


        return (
            <>
                <div className="container-wrap">

                    <input
                        type='button'
                        id='popup-toggle'
                        className='popup-toggle'
                        value='Узнать цену'
                        onClick={this.onShowModal}
                    />

                    <div id='form-main' className={formContainerClassNames} >
                        <div id='form-container' className='form-container'>
                            <div id='close' className='close' onClick={this.onHideModalCloseBtn}/>

                            <form id='form' className='form' name='contactForm'>

                                <p className={nameValidateClass}>
                                    <ValidateMessage valid={usernameValid}
                                                     message={errorMsg.username}
                                    />
                                    <label htmlFor='username'>
                                        <i className='fas fa-user fa-2x' />
                                    </label>
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
                                    <ValidateMessage valid={phoneValid}
                                                     message={errorMsg.phone}
                                    />
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
                                        onChange={e => this.updatePhoneNumber(e.target.value)}
                                        required
                                    />
                                </p>

                                <p className='email'>
                                    <ValidateMessage valid={emailValid}
                                                     message={errorMsg.email}
                                    />
                                    <label htmlFor='email'>
                                        <i className='fas fa-phone-alt fa-2x' />
                                    </label>
                                    <input
                                        type='email'
                                        name='email'
                                        className='feedback-input'
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
                                        className='feedback-input'
                                        placeholder='Ваша компания'
                                        id='company'
                                        value={company}
                                        onChange={e => this.updateCompanyName(e.target.value)}
                                    />
                                </p>

                                <p className='text'>
                                <textarea
                                    name='text'
                                    className='feedback-input textarea'
                                    id='text'
                                    placeholder='Комментарий'
                                    value={comment}
                                    onChange={e => this.updateComment(e.target.value)}
                                />
                                </p>

                                <div className={formValid ? 'submit' : 'submit-disabled'}>
                                    <input
                                        type='submit'
                                        id='button-blue'
                                        className={formValid ? 'button-blue' : 'button-disabled'}
                                        value='Получить цену'
                                        onClick={this.onMirageText}
                                        disabled={ !formValid }
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className={popupMirageText} id="popup-text-container">
                    <div id="popup-text" className='popup-text' >
                        <p>
                            Наши специалисты свяжутся с Вами в ближайшее время
                        </p>
                    </div>
                </div>
            </>
        )
    }
};
