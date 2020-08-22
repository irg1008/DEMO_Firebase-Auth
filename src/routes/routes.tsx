// Log Pages.
import SignUpPage from "../pages/log_pages/sign_up_page";
import LogInPage from "../pages/log_pages/log_in_page";
import CompleteSignUpPage from "../pages/log_pages/complete_sign_up_page";

// Landing Page.
import LandingPage from "../pages/landing_page";

// Error page.
import ErrorPage from "../pages/error_page";

// Page information type.
export type IPageType = {
  /**
   * Id of page.
   *
   * @type {number}
   */
  id: number;

  /**
   * Path of page.
   *
   * @type {string}
   */
  path: string;

  /**
   * Path is exact.
   *
   * @type {boolean}
   */
  exact?: boolean;

  /**
   * Hide on user is signed.
   *
   * @type {boolean}
   */
  hideOnUserSigned?: boolean;

  /**
   * Hide on user is unsigned.
   *
   * @type {boolean}
   */
  hideOnUserUnsigned?: boolean;

  /**
   * Component to render in given path. Function or class component.
   *
   * @type {(React.FC | React.ComponentClass)}
   */
  Component: React.FC | React.ComponentClass;
};

// Page id increaser on every call.
let pageId: number = 0;
/**
 * Increase the page id on every call.
 *
 * @returns
 */
const getId = () => {
  return pageId++;
};

// Loading page.
export const LANDING: IPageType = {
  id: getId(),
  path: "/",
  exact: true,
  Component: LandingPage,
};

// Sign Up page.
export const SIGN_UP: IPageType = {
  id: getId(),
  path: "/unete",
  exact: true,
  hideOnUserSigned: true,
  Component: SignUpPage,
};

// Log In page.
export const LOG_IN: IPageType = {
  id: getId(),
  path: "/inicia",
  exact: true,
  hideOnUserSigned: true,
  Component: LogInPage,
};

// Complete sign up page.
export const COMPLETE_SIGN: IPageType = {
  id: getId(),
  path: "/completar-cuenta",
  exact: true,
  hideOnUserUnsigned: true,
  Component: CompleteSignUpPage,
};

// Error page not found.
export const ERROR: IPageType = {
  id: getId(),
  path: "*", // Change this this to "*" to maintain path.
  Component: ErrorPage,
};
