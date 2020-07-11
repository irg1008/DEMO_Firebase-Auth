// All pages
import LandingPage from "../pages/landing_page";
import ErrorPage from "../pages/error_page";
import SignUpPage from "../pages/log_pages/sign_up_page";
import LogInPage from "../pages/log_pages/log_in_page";
import CompleteSignUpPage from "../pages/log_pages/complete_sign_up_page";

// Page information type.
type PageInformation = {
  /**
   * Id of room.
   *
   * @type {number}
   */
  id: number;

  /**
   * Path of page.
   *
   * @type {(string | any)}
   */
  path?: string | any;

  /**
   * Path is exact.
   *
   * @type {boolean}
   */
  exact?: boolean;

  /**
   * Component to render in given path.
   *
   * @type {*}
   */
  Component: any;
};

// Page id increaser on every call.
let pageId: number = 0;
const getId = () => {
  return pageId++;
};

// Loading page
export const LANDING: PageInformation = {
  id: getId(),
  path: "/",
  exact: true,
  Component: LandingPage,
};

// Sign Up page
export const SIGN_UP: PageInformation = {
  id: getId(),
  path: "/unete",
  exact: true,
  Component: SignUpPage,
};

// Log In page
export const LOG_IN: PageInformation = {
  id: getId(),
  path: "/inicia",
  exact: true,
  Component: LogInPage,
};

// Complete sign up page
export const COMPLETE_SIGN: PageInformation = {
  id: getId(),
  path: "/completa_usuario",
  exact: true,
  Component: CompleteSignUpPage,
};

// Error page
export const ERROR: PageInformation = {
  id: getId(),
  Component: ErrorPage,
};
