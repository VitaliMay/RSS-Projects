import constrols from '../../store/constrols';

function validateForm() {
  // линтер падла
  // const { formLogin, inputLogin, inputLoginInfo } = constrols.page.login;
  // const { inputPassword, inputPasswordInfo, buttonFormLogin } = constrols.page.login;

  const {
    // formLogin,
    inputLogin: login,
    inputLoginInfo,
    inputPassword: password,
    inputPasswordInfo,
    buttonFormLogin,
  } = constrols.page.login;

  let isLoginValid = false;
  let isPasswordValid = false;

  // Валидация логина
  const loginValue = login.value.trim();
  if (!loginValue) {
    inputLoginInfo.textContent = 'Login is required';
  } else if (loginValue.length < 3) {
    inputLoginInfo.textContent = 'Login must be at least 3 characters';
  } else {
    inputLoginInfo.textContent = '';
    isLoginValid = true;
  }

  const passwordValue = password.value;
  const minLength = parseInt(password.minLength, 10) || 4;
  const allowedPattern = /^[A-Za-z0-9!@#$%^&*]+$/; // Только эти символы разрешены

  const hasInvalidChars = !allowedPattern.test(passwordValue);

  if (!passwordValue.trim()) {
    inputPasswordInfo.textContent = 'Password is required';
    isPasswordValid = false;
  } else if (passwordValue.length < minLength) {
    inputPasswordInfo.textContent = `Password must be at least ${minLength} characters`;
    isPasswordValid = false;
  } else if (hasInvalidChars) {
    inputPasswordInfo.textContent = 'Only Latin letters, numbers and !@#$%^&* symbols allowed';
    isPasswordValid = false;
  } else if (loginValue === passwordValue) {
    inputPasswordInfo.textContent = 'The password must not match the login';
    isPasswordValid = false;
  } else {
    inputPasswordInfo.textContent = '';
    isPasswordValid = true;
  }

  buttonFormLogin.disabled = !(isLoginValid && isPasswordValid);
}

export default validateForm;
