import React, { useState } from "react";

// Loading Context
const LoadingContext = React.createContext<any>(null);

// CONSUMER
/**
 * Consumer of loading component. Not props passed to child.
 *
 * @param {*} Component
 */
const withLoading = (Component: any) => (props: any) => (
  <LoadingContext.Consumer>
    {(loadingContext) => (
      <Component {...props} loadingContext={loadingContext} />
    )}
  </LoadingContext.Consumer>
);

// PROVIDER
/**
 * Loading provider.
 *
 * @param {*} props
 * @returns
 */
const LoadingProvider: React.FC = ({ children }: any) => {
  // Loading state.
  const [loading, setLoading] = useState(false);

  /**
   * Show Loading.
   *
   */
  const showLoading = (): void => setLoading(true);

  /**
   * Hide loading.
   *
   */
  const hideLoading = (): void => setLoading(false);

  // We pass the loading value and the handling functions to be used by consumers and passed to the loading child.
  return (
    <LoadingContext.Provider
      value={{
        loading,
        showLoading,
        hideLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

// Export consumer and provider
export { withLoading, LoadingProvider };
