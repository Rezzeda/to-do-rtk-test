import { combineReducers } from "redux";
import toDosReducer, { todosSlice } from "./todosSlice";

export const rootReducer = combineReducers({
    [todosSlice.name] : toDosReducer,
})