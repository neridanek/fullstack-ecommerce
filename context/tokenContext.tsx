import { createContext, useMemo, useReducer, useContext } from "react";
import { tokenReducer } from "./reducers/tokenReducer";
import { TokenAction, TokenState } from "./types";

type tokenProviderProps = {
  children: React.ReactNode;
};
type Dispatch = (action: TokenAction) => void;

export const TokenStateContext = createContext<
  | {
      state: TokenState;
      dispatch: Dispatch;
    }
  | undefined
>(undefined);

const initialState: TokenState = {
  accessToken: null,
  refreshToken: null,
};

export const TokenProvider = ({ children }: tokenProviderProps) => {
  const [state, dispatch] = useReducer(tokenReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <TokenStateContext.Provider value={value}>
      {children}
    </TokenStateContext.Provider>
  );
};
export const useToken = () => {
  const context = useContext(TokenStateContext);
  return context;
};
