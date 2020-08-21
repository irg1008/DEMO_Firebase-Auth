// Floating message type.
export type IFloatingMsg = {
  /**
   * Name to identify the floating message.
   *
   * @type {string}
   */
  name: string;

  /**
   * Message to show on floating message.
   *
   * @type {(string | JSX.Element)}
   */
  message: string | JSX.Element;

  /**
   *Time for the message to disappear.
   *
   * @type {number}
   */
  timeoutTime: number;
};

// Initial state for floating message.
export const INITIAL_FLOATING_MSG: IFloatingMsg = {
  name: "",
  message: "",
  timeoutTime: 10000,
};
