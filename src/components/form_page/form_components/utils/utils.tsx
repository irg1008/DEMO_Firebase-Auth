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
    isValid: true,
    errorMsg: "",
  };

  // Min 6 chars
  // Min 1 Number
  // Min 1 upper letter
  // Min 1 lower letter
  // Min 1 special char
  if (
    passwordOne.length < 6 ||
    !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(passwordOne)
  ) {
    passwordCheck.isValid = false;
    passwordCheck.errorMsg =
      "La contraseña debe tener mínimo 6 caracteres y contener un número, letra mínúcula, mayúscula y un caracter especial: !@#$%^&*";
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
