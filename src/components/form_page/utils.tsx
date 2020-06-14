/**
 * Check username validation.
 *
 * @param {string} username
 * @returns Username is valid.
 */
const checkUsername = (username: string) => {
  let usernameCheck = {
    isValid: true,
    errorMsg: "",
  };

  // Checking username lenght > 3
  if (username.length < 3) {
    usernameCheck.isValid = false;
    usernameCheck.errorMsg =
      "El usuario tiene que tener mínimo tres caracteres";
  }

  return usernameCheck;
};

/**
 * Check password validation.
 *
 * @param {string} password
 * @returns Email is valid.
 */
const checkEmail = (email: string) => {
  let emailCheck = {
    isValid: true,
    errorMsg: "",
  };

  // Checking email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailCheck.isValid = false;
    emailCheck.errorMsg =
      "El email tiene que tener un formato tipo: silk@rock.com";
  }

  return emailCheck;
};

/**
 * Validates the first password.
 *
 * @param {string} passwordOne
 * @returns Password One is valid
 */
const checkFirstPassword = (passwordOne: string) => {
  let passwordCheck = {
    isValid: false,
    errorMsg: "",
  };

  // Min 6 chars, un upper and lower case and number
  if (passwordOne.length < 6) {
    passwordCheck.errorMsg =
      "La contraseña tiene que tener mínimo 6 caracteres";
  } else if (!/(?=.*[0-9])/.test(passwordOne)) {
    passwordCheck.errorMsg = "La contraseña tiene que tener al menos un número";
  } else if (!/(?=.*[a-z])/.test(passwordOne)) {
    passwordCheck.errorMsg =
      "La contraseña tiene que tener al menos una letra minúsucla";
  } else if (!/(?=.*[A-Z])/.test(passwordOne)) {
    passwordCheck.errorMsg =
      "La contraseña tiene que tener al menos una letra mayúscula";
  } else if (!/(?=.*[!@#$%^&*])/.test(passwordOne)) {
    passwordCheck.errorMsg =
      "La contraseña tiene que tener al menos un caracter especial: !@#$%^&*";
  } else {
    passwordCheck.isValid = true;
  }

  return passwordCheck;
};

/**
 * Validates the second password.
 *
 * @param {string} passwordTwo
 * @returns Password Two is valid
 */
const checkConfirmPassword = (passwordOne: string, passwordTwo: string) => {
  let passwordTwoCheck = {
    isValid: true,
    errorMsg: "",
  };

  // Check password confirmation
  if (passwordOne !== passwordTwo) {
    passwordTwoCheck.isValid = false;
    passwordTwoCheck.errorMsg = "Las contraseñas no coinciden";
  }

  return passwordTwoCheck;
};

export { checkUsername, checkEmail, checkFirstPassword, checkConfirmPassword };
