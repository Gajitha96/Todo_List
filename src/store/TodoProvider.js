import React, { useReducer } from "react";

import TodoContext from "./TodoContext";

const defaltTodoState = {
  items: [],
};

const todoReducer = (state, action) => {
  if (action.type === "ADD") {
    console.log("ADD");
    const updatedItem = state.items.concat(action.item);

    return {
      items: updatedItem,
    };
  }

  if (action.type === "REMOVE") {
    const updatedTodos = state.items.filter((item) => item.id !== action.id);
    console.log("Remove");
    console.log(updatedTodos);

    return {
      items: updatedTodos,
    };
  }

  if (action.type === "UPDATE") {
    console.log("UPDATE");
    const updatedTodos = state.items.map((item) =>
      item.id === action.id ? { ...item, ...action.updatedTodo } : item
    );

    return {
      items: updatedTodos
    };
  }
};

const TodoProvider = (props) => {
  const [todoState, dispatchTodoAction] = useReducer(
    todoReducer,
    defaltTodoState
  );

  const addTodoHandler = (item) => {
    dispatchTodoAction({ type: "ADD", item: item });
  };

  const removeTodoHandler = (id) => {
    dispatchTodoAction({ type: "REMOVE", id: id });
  };

  const updateTodoHandler = (updateItem) => {
    dispatchTodoAction({
      type: "UPDATE",
      id: updateItem.id,
      updateItem: updateItem,
    });
  };

  const todoContext = {
    items: todoState.items,
    addItem: addTodoHandler,
    removeItem: removeTodoHandler,
    updateItem: updateTodoHandler,
  };

  return (
    <TodoContext.Provider value={todoContext}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
