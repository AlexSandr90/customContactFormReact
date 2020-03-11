export default class Helpers {


    faidText = document.getElementById('popup-text-container');
    name = document.getElementById('name');
    phone = document.getElementById('phone');
    email = document.getElementById('email');
    company = document.getElementById('company');
    formMain = document.getElementById('form-main');
    close = document.getElementById('close');

    nameFormat = `/^[a-zA-Zа-яА-Я ]{2,30}$/`;
    phoneFormat = `/^\+?([3-8]{2})\)?([0-9]{10})$/`;
    mailFormat = `/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`;

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

    onMirageText = (el, className, addTime, removeTime) => {
        setTimeout(() => this.addClass(el, className), addTime);
        setTimeout(() => this.removeClass(el, className), removeTime);
    };

    nameChecked = this.itemValidate(this.name, this.nameFormat, document.contactForm.name, 'Невірний формат даних');
    phoneChecked = this.itemValidate(this.phone, this.phoneFormat, document.contactForm.phone, 'Невірний формат номеру');
    emailChecked = this.itemValidate(this.email, this.mailFormat, document.contactForm.email, 'Невірний формат пошти');



    /*
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

    nameChecked = () => {
        const name = document.getElementById('name');
        const nameFormat = /^[a-zA-Zа-яА-Я ]{2,30}$/;

        return this.itemValidate(name, nameFormat, document.contactForm.name, 'Невірний формат даних');
    };

    phoneChecked = () => {
        const phone = document.getElementById('phone');
        const phoneFormat = /^\+?([3-8]{2})\)?([0-9]{10})$/;
        return this.itemValidate(phone, phoneFormat, document.contactForm.phone, 'Невірний формат номеру');
    };

    emailChecked = () => {
        const email = document.getElementById('email');
        const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return this.itemValidate(email, mailFormat, document.contactForm.email, 'Невірний формат пошти');
    };

    removeClassErrors = (className, ...elements) => {
        const el = [...elements];
        el.forEach(item => this.removeClass(item, className));
    };

    resetValue = elements => elements.forEach(item => item.value = '');

    formValidate = () => {
        const res = this.nameChecked && this.phoneChecked && this.emailChecked ? true : false;
        console.log(res);
        return res;
    };

    submitForm = () => event => {
        event.preventDefault();

        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const company = document.getElementById('company');

        const faidText = document.getElementById('popup-text-container');
        const formMain = document.getElementById('form-main');

        const close = document.getElementById('close');




        // const nameChecked = this.itemValidate(this.name, nameFormat, document.contactForm.name, 'Невірний формат даних');
        // const phoneChecked = this.itemValidate(this.phone, phoneFormat, document.contactForm.phone, 'Невірний формат номеру');
        // const emailChecked = this.itemValidate(this.email, mailFormat, document.contactForm.email, 'Невірний формат пошти');

        const elements = [this.name, this.phone, this.email, this.company];

        // if (nameChecked && phoneChecked && emailChecked) {
        //     this.onMirageText(faidText, 'popup-up', 750, 2000);
        //     this.removeClassErrors('error-box-form', this.name, this.phone, this.email, company);
        //     setTimeout(() => this.toggleClass(formMain, 'show-modal', 500));
        //     this.resetValue(elements);
        // }

    };

    onMirageText = (el, className, addTime, removeTime) => {
        setTimeout(() => this.addClass(el, className), addTime);
        setTimeout(() => this.removeClass(el, className), removeTime);
    };
    */
}