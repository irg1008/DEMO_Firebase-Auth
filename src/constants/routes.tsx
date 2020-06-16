import React from "react";

// All pages
import LandingPage from "../pages/landing_page";
import ErrorPage from "../pages/error_page";
import SignUpPage from "../pages/sign_up_page";
import LogInPage from "../pages/log_in_page";

// Page information interface
interface PageInformation {
  id: number;
  path?: string | any;
  exact?: boolean;
  component: any;
}

// Page id
let pageId: number = 0;
const getId = () => {
  return pageId++;
};

// Loading page
export const LANDING: PageInformation = {
  id: getId(),
  path: "/",
  exact: true,
  component: () => <LandingPage />,
};

// Loading page
export const SIGN_UP: PageInformation = {
  id: getId(),
  path: "/join",
  exact: true,
  component: () => <SignUpPage />,
};

// Loading page
export const LOG_IN: PageInformation = {
  id: getId(),
  path: "/login",
  exact: true,
  component: () => <LogInPage />,
};

// Loading page
export const ERROR: PageInformation = {
  id: getId(),
  component: () => <ErrorPage />,
};

// Routes and path of every page added
const pages = [{ ...LANDING }, { ...SIGN_UP }, { ...LOG_IN }, { ...ERROR }];

export default pages;
