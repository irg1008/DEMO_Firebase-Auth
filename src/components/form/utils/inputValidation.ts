// Error to return or null error (no errors), after validation.
type InputError = string | null | JSX.Element;

/**
 * Input validation class.
 *
 * @class InputValidation Input class.
 */
class InputValidation {
  /**
   * Checks username validation.
   *
   * @memberof InputValidation
   */
  errorUsername = (username: string): InputError => {
    // Checking username is empty.
    if (username.length === 0) return "El nombre no puede estar vacio";
    // Checking username lenght > 3.
    else if (username.length < 3)
      return "El nombre tiene que tener mínimo tres caracteres";
    // Checking username too long.
    else if (username.length > 40) return "El usuario es demasiado largo";
    // Username is correct
    else return null;
  };

  /**
   * Checks email validation.
   *
   * @memberof InputValidation
   */
  errorEmail = (email: string): InputError => {
    // Checking email is empty.
    if (email.length === 0) return "El email no puede estar vacio";
    // Checking email format.
    else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9]{2,}$/.test(email))
      return "El email tiene que tener un formato tipo: email@aqui.com";
    // Email is correct.
    else return null;
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
  fetchEmailIsDisposable = (email: string): Promise<{ disposable: boolean }> =>
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
  errorPassword = (password: string): InputError => {
    // Checking password is empty.
    if (password.length === 0) return "La contraseña no puede estar vacia";
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
      return "La contraseña debe tener mínimo 6 caracteres y contener al menos un número, letra mínúcula y una mayúscula";
    // Password is correct.
    else return null;
  };

  /**
   * Validate a pair of password.
   * Used mainly on sign up forms.
   *
   * @memberof InputValidation
   */
  errorPasswordConfirm = (
    password: string,
    passwordConfirm: string
  ): InputError => {
    // If first password is empty => Reflex that status on second password.
    if (password.length === 0) return "La contraseña está vacia";
    // If passwords does not match.
    else if (password !== passwordConfirm)
      return "Las contraseñas no coinciden";
    // If passwords match but first is not valid => Second reflex first password state.
    else if (
      password === passwordConfirm &&
      this.errorPassword(passwordConfirm) !== null
    )
      return "La contraseña es inválida. Revisa los requisitos arriba";
    // Confirm password is correct.
    else return null;
  };
}

const inputValidation = new InputValidation();
export default inputValidation;
