import React from "react";

// PROVIDERS
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
        <FloatingMsgProvider>{children}</FloatingMsgProvider>
      </AuthProvider>
    </LoadingProvider>
  </FirebaseProvider>
);

export default ProvidersWrapper;
