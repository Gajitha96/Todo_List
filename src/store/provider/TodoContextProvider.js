import { createContext, useContext, useReducer } from "react";
import {
  pageLoaderStatusKey,
  refreshTodoDataKey,
  requestTodoDataKey,
} from "../../config/action-keys";
import { todoActions } from "../actions/Todo";

const intialState = { todoItem: [], refreshState: false, isLoading: false };

const TodoContext = createContext({});

const useTodoContext = () => useContext(TodoContext);

const todoReducer = (state, action) => {
  switch (action.type) {
    case requestTodoDataKey:
      return { ...state, todoItem: action.payload };
    case refreshTodoDataKey:
      return { ...state, refreshState: !state.refreshState };
    case pageLoaderStatusKey:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, intialState);
  const dispatchActions = todoActions(dispatch);
  return (
    <TodoContext.Provider value={[state, dispatchActions]}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoContextProvider, useTodoContext };
