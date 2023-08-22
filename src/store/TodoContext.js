import React from "react";

const TodoContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  updateItem: (updateItem) => {},
});

export default TodoContext;
