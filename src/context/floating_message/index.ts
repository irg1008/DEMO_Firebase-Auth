// Floating Message
import FloatingMessage from "./FloatingMessage";

// Import loading context and provider.
import {
  withFloatingMsg,
  useFloatingMsg,
  FloatingMsgProvider,
} from "./context";

import type { IFloatingMsgContext } from "./context";

export default FloatingMessage;

export { withFloatingMsg, FloatingMsgProvider, useFloatingMsg };

export type { IFloatingMsgContext };
