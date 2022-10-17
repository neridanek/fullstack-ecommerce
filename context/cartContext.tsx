import { createContext, useMemo, useReducer, useContext } from "react";
import { cartReducer } from "./reducers/cartReducer";
import { CartAction, CartState } from "./types";

type CartProviderProps = {
  children: React.ReactNode;
};
type Dispatch = (action: CartAction) => void;

export const CartStateContext = createContext<
  | {
      state: CartState;
      dispatch: Dispatch;
    }
  | undefined
>(undefined);

const initialState: CartState = {
  products: [],
  totalPrice: 0,
  isOpen: false,
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <CartStateContext.Provider value={value}>
      {children}
    </CartStateContext.Provider>
  );
};
export const useCart = () => {
  const context = useContext(CartStateContext);

  return context;
};
