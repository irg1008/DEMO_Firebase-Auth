import React from "react";

// PROVIDERS
// Router Provider
import { BrowserRouter as RouterProvider } from "react-router-dom";

// Firebase
import { FirebaseProvider } from "./firebase";

// Loading
import { LoadingProvider } from "./loading";

// Auth
import { AuthProvider } from "./auth";

// Floating Message Provider
import { FloatingMsgProvider } from "./floating_message";

// Set here all providers of context folder.
const ProvidersWrapper: React.FC = ({ children }: any) => (
  <FirebaseProvider>
    <LoadingProvider>
      <AuthProvider>
        <FloatingMsgProvider>
          <RouterProvider>{children}</RouterProvider>
        </FloatingMsgProvider>
      </AuthProvider>
    </LoadingProvider>
  </FirebaseProvider>
);

export default ProvidersWrapper;
