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
 * Input validation class.
 * Does not extends from any external validators or uses any API for performance concerns.
 *
 * @class InputValidation Input class.
 */
class InputValidation {
  /**
   * If input is not valid => Return input with valid false and errorMsg.
   * Reay to use in form inputs.
   *
   * @memberof InputValidation
   */
  inputIsNotValid = (errorMsg: string): InputCheck => {
    const checkValidation: InputCheck = {
      isValid: false,
      errorMsg,
    };
    return checkValidation;
  };

  /**
   * If input is valid => Return initial state of input.
   *
   * @memberof InputValidation
   */
  inputIsValid = (): InputCheck => INITIAL_INPUT_CHECK;

  /**
   * Checks username validation.
   *
   * @memberof InputValidation
   */
  checkUsername = (username: string): InputCheck => {
    // Checking username is empty.
    if (username.length === 0)
      return this.inputIsNotValid("El nombre no puede estar vacio");
    // Checking username lenght > 3.
    else if (username.length < 3)
      return this.inputIsNotValid(
        "El nombre tiene que tener mínimo tres caracteres"
      );
    // Checking username too long.
    else if (username.length > 40)
      return this.inputIsNotValid("El usuario es demasiado largo");
    // Username is correct
    else return this.inputIsValid();
  };

  /**
   * Checks email validation.
   *
   * @memberof InputValidation
   */
  checkEmail = (email: string): InputCheck => {
    // Checking email is empty.
    if (email.length === 0)
      return this.inputIsNotValid("El email no puede estar vacio");
    // Checking email format.
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return this.inputIsNotValid(
        "El email tiene que tener un formato tipo: email@aqui.com"
      );
    // Email is correct.
    else return this.inputIsValid();
  };

  /**
   * Checks if passed email is disposable.
   * Fetch from RESTful API.
   * Returns promise to use "disposable" json value.
   * Warns on console if error happens.
   * Used API: https://open.kickbox.io/#:~:text=Free%2C%20Open%20API%20for%20Detecting,from%20your%20client-side%20code.
   *
   * @memberof InputValidation
   */
  fetchEmailIsDisposable = (email: string) =>
    fetch(
      "https://open.kickbox.com/v1/disposable/" + encodeURIComponent(email),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((error) => console.warn(error));

  /**
   * Checks password validation.
   *
   * @memberof InputValidation
   */
  checkFirstPassword = (password: string): InputCheck => {
    // Checking password is empty.
    if (password.length === 0)
      return this.inputIsNotValid("La contraseña no puede estar vacia");
    // Password requeriments: (+: Implemented, -: Not implemented)
    // + Min 6 chars.
    // + Min 1 Number: (?=.*[0-9])
    // + Min 1 upper letter: (?=.*[A-Z])
    // + Min 1 lower letter: (?=.*[a-z])
    // - Min 1 special char: (?=.*[!@#$%^&*])
    else if (
      password.length < 6 ||
      !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/.test(password)
    )
      return this.inputIsNotValid(
        "La contraseña debe tener mínimo 6 caracteres y contener al menos un número, letra mínúcula y una mayúscula"
      );
    // Password is correct.
    else return this.inputIsValid();
  };

  /**
   * Validate a pair of password.
   * Used mainly on sign up forms.
   *
   * @memberof InputValidation
   */
  checkConfirmPassword = (
    password: string,
    passwordConfirm: string
  ): InputCheck => {
    // If first password is empty => Reflex that status on second password.
    if (password.length === 0)
      return this.inputIsNotValid("La contraseña está vacia");
    // If passwords does not match.
    else if (password !== passwordConfirm)
      return this.inputIsNotValid("Las contraseñas no coinciden");
    // If passwords match but first is not valid => Second reflex first password state.
    else if (
      password === passwordConfirm &&
      !this.checkFirstPassword(passwordConfirm).isValid
    )
      return this.inputIsNotValid(
        "La contraseña es inválida. Revisa los requisitos arriba"
      );
    // Confirm password is correct.
    else return this.inputIsValid();
  };
}

const inputValidation = new InputValidation();
export default inputValidation;
