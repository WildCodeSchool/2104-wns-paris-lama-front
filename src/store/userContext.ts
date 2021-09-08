import { createContext } from "react";

export const initialUserState = {
  accessToken: "",
  name: "",
  email: "",
};
export type UserState = typeof initialUserState;
export interface IUserContext {
  user: UserState;
  updateUser: (user: UserState) => void;
}

const userContext = createContext<IUserContext>({
  user: initialUserState,
  updateUser: (user: UserState) => {},
});
export const UserContextConsumer = userContext.Consumer;
export const UserContextProvider = userContext.Provider;
export default userContext;
