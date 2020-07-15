// Import loading context and provider.
import { useLoading, withLoading, LoadingProvider } from "./context";

// Loading context type
import type { ILoadingContext } from "./context";

// Loading class
import Loading from "./Loading";

export type { ILoadingContext };

export default Loading;

export { useLoading, withLoading, LoadingProvider };
