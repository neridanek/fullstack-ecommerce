import type { TokenAction, TokenState } from "../types";

export const tokenReducer = (state: TokenState, action: TokenAction) => {
  switch (action.type) {
    case "addAccessToken": {
      return {
        ...state,
        accessToken: action.payload,
      };
    }
    case "addRefreshToken": {
      return {
        ...state,
        refreshToken: action.payload,
      };
    }
  }
};
