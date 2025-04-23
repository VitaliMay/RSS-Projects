import './login-page.scss';

import { createEl, getUUID, removeAllChild } from '../../utils/elementUtils';
import createButton from '../../components/button/button';
import constrols from '../../store/constrols';
import validateForm from './login-validate';
import storeLogin from '../../store/store';
import { ws } from '../../api/api';

const createFormLogin = (parent) => {
  const formLogin = createEl({ tag: 'form', classes: ['form-login'], parent });
  constrols.page.login.formLogin = formLogin;

  const labelLogin = createEl({
    tag: 'label',
    text: 'Enter your login',
    classes: ['login-label'],
    attributes: { for: 'login' },
    parent: formLogin,
  });

  const inputLogin = createEl({
    tag: 'input',
    classes: ['login-input'],
    parent: labelLogin,
    attributes: {
      id: 'login',
      name: 'login',
      type: 'text',
      minlength: '3',
      placeholder: 'Your Login',
      autocomplete: 'off',
      required: true,
      title: 'Логин должен быть от 3 символов',
    },
  });
  constrols.page.login.inputLogin = inputLogin;

  const inputLoginInfo = createEl({ tag: 'span', classes: ['login-info'], parent: labelLogin });
  constrols.page.login.inputLoginInfo = inputLoginInfo;

  const labelPassword = createEl({
    tag: 'label',
    text: 'Enter your password',
    classes: ['login-label'],
    attributes: { for: 'password' },
    parent: formLogin,
  });

  const inputPassword = createEl({
    tag: 'input',
    classes: ['login-input'],
    parent: labelPassword,
    attributes: {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Your Password',
      autocomplete: 'off',
      // autocomplete: 'new-password',
      required: true,
      minlength: '4',
      pattern: '[A-Za-z0-9!@#$%^&*]+',
      title: 'Пароль должен быть от 4 символов (латиница, цифры, спецсимволы)',
    },
  });
  constrols.page.login.inputPassword = inputPassword;

  const inputPasswordInfo = createEl({ tag: 'span', classes: ['login-info'], parent: labelPassword });
  constrols.page.login.inputPasswordInfo = inputPasswordInfo;

  const buttonFormLogin = createButton('Login', formLogin, ['button_max'], 'submit');
  buttonFormLogin.disabled = true;
  constrols.page.login.buttonFormLogin = buttonFormLogin;

  formLogin.addEventListener('input', validateForm);

  // formLogin.addEventListener('input', () => {
  //   const isValid = formLogin.checkValidity();
  //   buttonFormLogin.disabled = !isValid;
  // });

  // formLogin.addEventListener('submit', validateForm);
  formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log('Send password...');

    /** *************************************** */
    // ws.send({
    //   id: '',
    //   type: 'USER_LOGIN',
    //   payload: {
    //     user: {
    //       login: `${inputLogin.value}`,
    //       password: `${inputPassword.value}`,
    //     },
    //   },
    // });

    // Блокируем кнопку на время запроса
    constrols.page.login.buttonFormLogin.disabled = true;

    ws.send({
      id: getUUID(),
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: inputLogin.value.trim(),
          password: inputPassword.value,
        },
      },
    });

    removeAllChild(constrols.page.main.userList);
    console.log(constrols.page.main.userList);

    // ws.send({
    //   id: getUUID(),
    //   type: 'USER_ACTIVE',
    //   payload: null,
    // });

    // ws.send({
    //   id: getUUID(),
    //   type: 'USER_INACTIVE',
    //   payload: null,
    // });

    /** *************************************** */

    // window.location.hash = '/main';
    // constrols.userLogin.textContent = inputLogin.value;
    // storeLogin.addItem(inputLogin.value, inputPassword.value);
    // formLogin.reset();
  });
};

/** ****************************************** */
// function validateForm() {
//   // линтер падла
//   // const { formLogin, inputLogin, inputLoginInfo } = constrols.page.login;
//   // const { inputPassword, inputPasswordInfo, buttonFormLogin } = constrols.page.login;

//   const {
//     // formLogin,
//     inputLogin: login,
//     inputLoginInfo,
//     inputPassword: password,
//     inputPasswordInfo,
//     buttonFormLogin,
//   } = constrols.page.login;

//   let isLoginValid = false;
//   let isPasswordValid = false;

//   // Валидация логина
//   const loginValue = login.value.trim();
//   if (!loginValue) {
//     inputLoginInfo.textContent = 'Login is required';
//   } else if (loginValue.length < 3) {
//     inputLoginInfo.textContent = 'Login must be at least 3 characters';
//   } else {
//     inputLoginInfo.textContent = '';
//     isLoginValid = true;
//   }

//   const passwordValue = password.value;
//   const minLength = parseInt(password.minLength, 10) || 4;
//   const allowedPattern = /^[A-Za-z0-9!@#$%^&*]+$/; // Только эти символы разрешены

//   const hasInvalidChars = !allowedPattern.test(passwordValue);

//   if (!passwordValue.trim()) {
//     inputPasswordInfo.textContent = 'Password is required';
//     isPasswordValid = false;
//   } else if (passwordValue.length < minLength) {
//     inputPasswordInfo.textContent = `Password must be at least ${minLength} characters`;
//     isPasswordValid = false;
//   } else if (hasInvalidChars) {
//     inputPasswordInfo.textContent = 'Only Latin letters, numbers and !@#$%^&* symbols allowed';
//     isPasswordValid = false;
//   } else {
//     inputPasswordInfo.textContent = '';
//     isPasswordValid = true;
//   }

//   buttonFormLogin.disabled = !(isLoginValid && isPasswordValid);
// }

/** *********************************************** */
// Валидация пароля
// const passwordValue = password.value.trim();
// const minLength = parseInt(password.minLength, 10) || 4; // Значение по умолчанию
// const pattern = password.pattern ? new RegExp(password.pattern) : null;

// if (!passwordValue) {
//   inputPasswordInfo.textContent = 'Password is required';
//   isPasswordValid = false;
// } else if (passwordValue.length < minLength) {
//   inputPasswordInfo.textContent = `Password must be at least ${minLength} characters`;
//   isPasswordValid = false;
// } else if (pattern && !pattern.test(passwordValue)) {
//   inputPasswordInfo.textContent = password.title || 'Invalid password format';
//   isPasswordValid = false;
// } else {
//   inputPasswordInfo.textContent = '';
//   isPasswordValid = true;
// }

/** *********************************** */

// // Валидация пароля
// const passwordValue = password.value.trim();
// const passwordPattern = new RegExp(password.pattern);

// if (!passwordValue) {
//   inputPasswordInfo.textContent = 'Password is required';
// } else if (passwordValue.length < password.minLength) {
//   inputPasswordInfo.textContent = `Password must be at least ${password.minLength} characters`;
// } else if (!passwordPattern.test(passwordValue)) {
//   inputPasswordInfo.textContent = password.title;
// } else {
//   inputPasswordInfo.textContent = '';
//   isPasswordValid = true;
// }

// buttonFormLogin.disabled = !(isLoginValid && isPasswordValid);

// const isValid = true;

/** **************************************** */
// FormData это обращение к DOM а у меня интуты и так есть

// const formData = new FormData(formLogin);

// if (!formData.get('login') || formData.get('login').trim() === '') {
//   inputLoginInfo.textContent = 'Login is required.';
//   isValid = false;
// } else {
//   inputLoginInfo.textContent = '';
// }

// // Валидация пароля
// if (!formData.get('password') || formData.get('password').trim() === '') {
//   inputPasswordInfo.textContent = 'Password is required.';
//   isValid = false;
// } else {
//   inputPasswordInfo.textContent = '';
// }

/** **************************************** */

// Если все поля валидны, можно отправить форму
// if (isValid) {
//   console.log('Form is valid. Submitting...');
//   buttonFormLogin.disabled = false;
//   // formLogin.submit();
//   // formLogin.reset();
// }
// }

// function validateForm(event) {
//   event.preventDefault();
//   const { formLogin, inputLoginInfo, inputPasswordInfo, buttonFormLogin } = constrols.page.login;

//   const formData = new FormData(formLogin);
//   let isValid = true;

//   if (!formData.get('login') || formData.get('login').trim() === '') {
//     inputLoginInfo.textContent = 'Login is required.';
//     isValid = false;
//   } else {
//     inputLoginInfo.textContent = '';
//   }

//   // Валидация пароля
//   if (!formData.get('password') || formData.get('password').trim() === '') {
//     inputPasswordInfo.textContent = 'Password is required.';
//     isValid = false;
//   } else {
//     inputPasswordInfo.textContent = '';
//   }

//   // Если все поля валидны, можно отправить форму
//   if (isValid) {
//     console.log('Всё нормально, форма пошла...');
//     // buttonFormLogin.disabled = false;
//     formLogin.submit();
//     formLogin.reset();
//   }
// }

export default createFormLogin;

// required
