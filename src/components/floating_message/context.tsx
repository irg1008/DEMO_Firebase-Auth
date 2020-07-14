import React, { useState } from "react";

// Loading Context
const FloatingMsgContext = React.createContext<any>(null);

// CONSUMER
/**
 * Coonsumer of floating message.
 *
 * @param {*} Component
 */
const withFloatingMsg = (Component: any) => (props: any) => (
  <FloatingMsgContext.Consumer>
    {(floatingMsgContext) => (
      <Component {...props} floatingMsgContext={floatingMsgContext} />
    )}
  </FloatingMsgContext.Consumer>
);

// PROVIDER
/**
 * Floating message provider.
 *
 * @param {*} props
 * @returns
 */
const FloatingMsgProvider: React.FC = ({ children }: any) => {
  // Message.
  const [message, setMessage] = useState("");

  // Show message
  const [show, setShow] = useState(false);

  // Countdown to hide
  const [countdown, setCountDown] = useState(0);

  // Remove timeout
  const removeTimeout = () => clearTimeout(countdown);

  // Set timeout
  const createTimeout = (timeOutTime?: number) =>
    setCountDown(setTimeout(() => setShow(false), timeOutTime || 10000));

  // Show Message and hide after default time.
  // Problem: When we keep calling showMessage without calling hide if manteins the timeout.
  // Soluction: Not executin function if message is active. Only one timeout is kepts until hiding.
  const showMessage = (newMessage: string, timeOutTime?: number): void => {
    // Shoe message.
    if (!show) {
      // Shoe message
      setShow(true);
    }

    if (newMessage !== message) {
      // Set message
      setMessage(newMessage);
    }

    // Clear timeout.
    removeTimeout();

    // Start timeout
    createTimeout(timeOutTime);
  };

  // Hide Message
  // We not check if it is showing because of synchronus problems and because there is no big interest. i.e. A timeOut.
  const hideMessage = (): void => {
    // Hide message
    setShow(false);

    // Remove timeout.
    removeTimeout();
  };

  // We pass the loading value and the handling functions to be used by consumers and passed to the loading child.
  return (
    <FloatingMsgContext.Provider
      value={{
        message,
        show,
        hideMessage,
        showMessage,
      }}
    >
      {children}
    </FloatingMsgContext.Provider>
  );
};

// Export consumer and provider
export { withFloatingMsg, FloatingMsgProvider };
