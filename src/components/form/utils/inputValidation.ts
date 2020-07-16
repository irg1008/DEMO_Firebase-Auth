// Input checking type.
type InputCheck = {
  /**
   * Input is valid.
   *
   * @type {boolean}
   */
  isValid: boolean;

  /**
   * Error message if invalid input.
   *
   * @type {string}
   */
  errorMsg: string;
};

// Initial state of input check.
// The isValid boolean is true because we don't want the inputs to show error on load.
const INITIAL_INPUT_CHECK: InputCheck = {
  isValid: true,
  errorMsg: "",
};

/**
 * Check username validation.
 *
 * @param {string} username
 * @returns {InputCheck}
 */
const checkUsername = (username: string): InputCheck => {
  let usernameCheck = { ...INITIAL_INPUT_CHECK };

  // Checking username is empty.
  if (username.length === 0) {
    usernameCheck.isValid = false;
    usernameCheck.errorMsg = "El nombre no puede estar vacio";
  }

  // Checking username lenght > 3.
  else if (username.length < 3) {
    usernameCheck.isValid = false;
    usernameCheck.errorMsg = "El nombre tiene que tener mínimo tres caracteres";
  }

  // Checking username too long.
  else if (username.length < 40) {
    usernameCheck.isValid = false;
    usernameCheck.errorMsg = "El usuario es demasiado largo.";
  }

  return usernameCheck;
};

/**
 * Checks if passed email is disposable. Async method.
 * Used API: https://open.kickbox.io/#:~:text=Free%2C%20Open%20API%20for%20Detecting,from%20your%20client-side%20code.
 *
 * @param {string} email
 * @returns {boolean}
 */
const emailIsDisposable = async (email: string): Promise<boolean> => {
  // API Endpoint.
  const endpoint = "https://open.kickbox.com/v1/disposable/";

  // Email to pass to API: Email on URI mode.
  const emailURI = encodeURIComponent(email);

  // Email is disposable
  let isDisposable = false;

  // Fetch from RESTful API.
  await fetch(endpoint + emailURI, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Set variable to disposable value.
      isDisposable = data.disposable;
    })
    .catch((error) => console.warn(error));

  return isDisposable;
};

/**
 * Check password validation.
 *
 * @param {string} email
 * @returns {InputCheck}
 */
const checkEmail = (email: string): InputCheck => {
  let emailCheck = { ...INITIAL_INPUT_CHECK };

  // Checking email is empty.
  if (email.length === 0) {
    emailCheck.isValid = false;
    emailCheck.errorMsg = "El email no puede estar vacio";
  }

  // Checking email format.
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailCheck.isValid = false;
    emailCheck.errorMsg =
      "El email tiene que tener un formato tipo: email@example.com";
  }

  // Checking email is not disposable.
  // Function returns promise so we use then to return promise value (isDisposable).
  // NOTE: Need to recheck if calling this on input change is correct.
  //       Is the same as asking firebase if user exists and s too slow.
  //       So we need to check if we move this to onSubmit or useEffect of some type.
  else {
    // We check the value (isDisposable) of the returned promise.
    emailIsDisposable(email).then((isDisposable: boolean) => {
      // If disposable => Email invalid.
      if (isDisposable) {
        emailCheck.isValid = false;
        emailCheck.errorMsg = "El dominio de email no es válido";
      }
    });
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
