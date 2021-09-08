import { createContext } from "react";
import { initialUserState } from "./userContext";

const Context = createContext(initialUserState);
export default Context;
