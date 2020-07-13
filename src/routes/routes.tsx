// Log Pages.
import SignUpPage from "../pages/log_pages/sign_up_page";
import { SignUpCheckEmailPage } from "../pages/log_pages/sign_up_page"
import LogInPage from "../pages/log_pages/log_in_page";
import { LogInCheckEmailPage } from "../pages/log_pages/log_in_page"
import CompleteSignUpPage from "../pages/log_pages/complete_sign_up_page";
import VerifyEmailPage from "../pages/log_pages/verify_email_page";

// Landing Page.
import LandingPage from "../pages/landing_page";

// Error page.
import ErrorPage from "../pages/error_page";

// Page information type.
export type IPageType = {
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
export const LANDING: IPageType = {
  id: getId(),
  path: "/",
  exact: true,
  Component: LandingPage,
};

// Sign Up page
export const SIGN_UP: IPageType = {
  id: getId(),
  path: "/unete",
  exact: true,
  Component: SignUpPage,
};

// Log In page
export const LOG_IN: IPageType = {
  id: getId(),
  path: "/inicia",
  exact: true,
  Component: LogInPage,
};

// Complete sign up page
export const COMPLETE_SIGN: IPageType = {
  id: getId(),
  path: "/completar-cuenta",
  exact: true,
  Component: CompleteSignUpPage,
};

// Verify page
export const VERIFY_EMAIL: IPageType = {
  id: getId(),
  path: "/verificar-email",
  exact: true,
  Component: VerifyEmailPage,
};

// Check email on login
export const CHECK_EMAIL_LOGIN: IPageType = {
  id: getId(),
  path: "/comprueba-email-para-iniciar",
  exact: true,
  Component: LogInCheckEmailPage,
};

// Check email on sign
export const CHECK_EMAIL_SIGN: IPageType = {
  id: getId(),
  path: "/comprueba-email-para-iniciar",
  exact: true,
  Component: SignUpCheckEmailPage,
};

// IMPORTANT: Keep this page the last one or will not be displayed.
//            This happnes because the previous overrides the no path
//            of the error page.

// Error page
export const ERROR: IPageType = {
  id: getId(),
  Component: ErrorPage,
};
