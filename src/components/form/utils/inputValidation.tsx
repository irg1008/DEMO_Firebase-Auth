// Types for input checking.
type InputCheck = {
  /**
   * Inout is valid.
   *
   * @type {boolean}
   * @memberof InputCheck
   */
  isValid: boolean;

  /**
   * Error message if input invalid.
   *
   * @type {string}
   * @memberof InputCheck
   */
  errorMsg: string;
};

// Initial state of input checks.
// Is valid on start to not show error message is empty until start typing. Change to false if that is the desired behaviour.
const INITIAL_INPUT_CHECK: InputCheck = {
  isValid: true,
  errorMsg: "",
};

/**
 * Check username validation.
 *
 * @param {string} username
 * @returns Username is valid.
 */
const checkUsername = (username: string): InputCheck => {
  let usernameCheck = { ...INITIAL_INPUT_CHECK };

  // Checking username is empty
  if (username.length === 0) {
    usernameCheck.isValid = false;
    usernameCheck.errorMsg = "El nombre no puede estar vacio";
  }
  // Checking username lenght > 3
  else if (username.length < 3) {
    usernameCheck.isValid = false;
    usernameCheck.errorMsg = "El nombre tiene que tener mínimo tres caracteres";
  }

  return usernameCheck;
};

/**
 * Check password validation.
 *
 * @param {string} password
 * @returns Email is valid.
 */
const checkEmail = (email: string): InputCheck => {
  let emailCheck = { ...INITIAL_INPUT_CHECK };

  // Checking email is empty
  if (email.length === 0) {
    emailCheck.isValid = false;
    emailCheck.errorMsg = "El email no puede estar vacio";
  }
  // Checking email format
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailCheck.isValid = false;
    emailCheck.errorMsg =
      "El email tiene que tener un formato tipo: email@example.com";
  }

  return emailCheck;
};

/**
 * Validates the first password.
 *
 * @param {string} passwordOne
 * @returns Password One is valid
 */
const checkFirstPassword = (passwordOne: string): InputCheck => {
  let passwordCheck = { ...INITIAL_INPUT_CHECK };

  // Checking email is empty
  if (passwordOne.length === 0) {
    passwordCheck.isValid = false;
    passwordCheck.errorMsg = "La contraseña no puede estar vacia";
  }
  // Min 6 chars
  // Min 1 Number
  // Min 1 upper letter
  // Min 1 lower letter
  // Min 1 special char
  else if (
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
const checkConfirmPassword = (
  passwordOne: string,
  passwordTwo: string
): InputCheck => {
  let passwordTwoCheck = { ...INITIAL_INPUT_CHECK };

  // Check password confirmation
  if (passwordOne.length === 0) {
    passwordTwoCheck.isValid = false;
    passwordTwoCheck.errorMsg = "La contraseña está vacia";
  } else if (passwordOne !== passwordTwo) {
    passwordTwoCheck.isValid = false;
    passwordTwoCheck.errorMsg = "Las contraseñas no coinciden";
  } else if (
    passwordOne === passwordTwo &&
    !checkFirstPassword(passwordTwo).isValid
  ) {
    passwordTwoCheck.isValid = false;
    passwordTwoCheck.errorMsg =
      "La contraseña es inválida. Revisa los requisitos arriba";
  }

  return passwordTwoCheck;
};

export { checkUsername, checkEmail, checkFirstPassword, checkConfirmPassword };
