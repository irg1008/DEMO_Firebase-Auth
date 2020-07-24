import React from "react";

// PROVIDERS.
// Firebase.
import { FirebaseProvider } from "./firebase";

// Loading.
import { LoadingProvider } from "./loading";

// Auth.
import { AuthProvider } from "./auth";

// Floating Message.
import { FloatingMsgProvider } from "./floating_message";

// Provider props.
type IProviderProps = {
  children: React.ReactNode;
};
/**
 * Wrap children with providers of all context => Works like a store of some kind.
 *
 * @param {IProviderProps} {
 *   children,
 * }
 */
const ProvidersWrapper: React.FC<IProviderProps> = ({
  children,
}: IProviderProps) => (
  <FirebaseProvider>
    <LoadingProvider>
      <AuthProvider>
        <FloatingMsgProvider>{children}</FloatingMsgProvider>
      </AuthProvider>
    </LoadingProvider>
  </FirebaseProvider>
);

export default ProvidersWrapper;
