//validation firstName, lastName and birthday
export function warningMessage(id) {
    const warningEle = document.createElement('p');
    warningEle.setAttribute('class', 'warning');
    warningEle.innerText = '*Please fill out this field';
    document.querySelector(id).appendChild(warningEle);
}

//validation email and password
export const reg_user_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const reg_user_password = /^(?=.*\d)(?=.*[a-z]).{6,}$/;