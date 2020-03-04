

const addClass = (el, className) => {
    el.classList.add(className);
};

const removeClass = (el, className) => {
    el.classList.remove(className);
};

const toggleClass = (el, className) => {
    el.classList.toggle(className);
};

const itemValidate = (item, itemFormat, itemFocus, placeholderValue, className = 'error-box-form') => {

    if (item.value.match(itemFormat)) {
        itemFocus.focus();
        return true
    }

    itemFocus.focus();
    item.placeholder = placeholderValue;
    item.classList.add(className);
    return false;
};

const removeClassErrors = (className, ...elements) => {
    const el = [...elements];
    el.forEach(item => this.removeClass(item, className));
};

const resetValue = elements => elements.forEach(item => item.value = '');

const onMirageText = (el, className, addTime, removeTime) => {
    setTimeout(() => this.addClass(el, className), addTime);
    setTimeout(() => this.removeClass(el, className), removeTime);
}

export {
    addClass,
    resetValue,
    removeClass,
    toggleClass,
    itemValidate,
    onMirageText,
    removeClassErrors
}