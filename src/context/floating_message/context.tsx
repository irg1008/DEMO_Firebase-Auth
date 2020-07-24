import React, { createContext, useContext, useReducer } from "react";

// Floating Message type.
import { IFloatingMsg, INITIAL_FLOATING_MSG } from "./FloatingMessage.types";

// Array of floating messages.
type IFloatingMsgArray = {
  floatingMsgArray: Array<IFloatingMsg>;
};

// Initial value of floating msg array.
const INITIAL_FLOATING_MSG_ARRAY: IFloatingMsgArray = {
  floatingMsgArray: [],
};

// Floating context.
type IFloatingMsgContext = {
  state: IFloatingMsgArray;
  dispatch: (action: Action) => void;
};

// Initial floating context.
const INITIAL_FLOATING_CONTEXT: IFloatingMsgContext = {
  state: INITIAL_FLOATING_MSG_ARRAY,
  dispatch: () => {},
};

// Action type and payload values.
type Action =
  | {
      /**
       * Add new floating message.
       *
       * @type {"ADD_FLOATING"}
       */
      type: "ADD_FLOATING";

      /**
       * Name of floating message. Works as id.
       *
       * @type {string}
       */
      name: string;

      /**
       * Message to show.
       *
       * @type {string}
       */
      message: string;

      /**
       * Time for the message to dissapear.
       *
       * @type {number}
       */
      timeoutTime: number | "default" | "infinite";
    }
  | {
      /**
       * Remove the floating message.
       *
       * @type {"REMOVE_FLOATING"}
       */
      type: "REMOVE_FLOATING";

      /**
       * Name of the floating message to remove.
       *
       * @type {string}
       */
      name: string;
    };

/**
 * Reducer of floating mressage context.
 *
 * @param {IFloatingMsgState} state
 * @param {Action} action
 * @returns
 */
const reducer = (state: IFloatingMsgArray, action: Action) => {
  switch (action.type) {
    case "ADD_FLOATING": {
      // Action decostruction.
      const { name, message, timeoutTime } = action;

      // Floating msg array.
      const { floatingMsgArray } = state;

      // If time is:
      // - "default": default value of initial state.
      // - "infinite": Negative value or 0 => No timeout will be set => Infinite.
      // - other: passed value.
      const time =
        timeoutTime === "default"
          ? INITIAL_FLOATING_MSG.timeoutTime
          : timeoutTime === "infinite"
          ? 0
          : timeoutTime;

      // Filter an array with floating messages with passed name.
      const floatingMsgWithPassedName = floatingMsgArray.filter(
        (floatingMsg) => floatingMsg.name === name
      );

      // If arrays has not got the message already => Include (push).
      // Include with passed info.
      if (floatingMsgWithPassedName.length === 0)
        floatingMsgArray.push({ name, message, timeoutTime: time });

      return { ...state, floatingMsgArray };
    }
    case "REMOVE_FLOATING": {
      // Action decostruction.
      const { name } = action;

      // Floating msg array.
      const { floatingMsgArray } = state;

      // If array sis not empty.
      if (floatingMsgArray.length !== 0) {
        // Filter all messages with name different to given name.
        let arrayWithoutPassedName = floatingMsgArray.filter(
          (floatingMsg) => floatingMsg.name !== name
        );

        return { ...state, floatingMsgArray: arrayWithoutPassedName };
      }
      // If array is empty.
      else {
        return { ...state, floatingMsgArray };
      }
    }
    default:
      throw new Error("No such action exists on floating message context");
  }
};

// CONTEXT.
const FloatingMsgContext = createContext(INITIAL_FLOATING_CONTEXT);

// CONSUMER.
/**
 * Functional context consumer.
 *
 */
const useFloatingMsg = () => useContext(FloatingMsgContext);

// PROVIDER.
// Provider props.
type IProviderProps = {
  children: React.ReactNode;
};
/**
 * Floating message provider.
 *
 * @param {*} { children }
 * @returns
 */
const FloatingMsgProvider: React.FC<IProviderProps> = ({
  children,
}: IProviderProps) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_FLOATING_MSG_ARRAY);

  return (
    <FloatingMsgContext.Provider value={{ state, dispatch }}>
      {children}
    </FloatingMsgContext.Provider>
  );
};

export { useFloatingMsg, FloatingMsgProvider };
