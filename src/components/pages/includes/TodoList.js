import { useState } from "react";

import TodoItem from "./TodoItem";
import AddList from "../../../components/pages/includes/AddList";
import styles from "./TodoList.module.css";

const TodoList = ({ todoItem }) => {
  const [showAddList, setShowAddList] = useState(false);

  const closehandler = () => {
    setShowAddList(false);
  };

  return (
    <div className={styles.todoList}>
      <ul>
        {todoItem.map((todo) => (
          <TodoItem
            key={todo._uuid}
            id={todo._uuid}
            input={todo.input}
            completed={todo.completed}
          />
        ))}
      </ul>
      {showAddList && <AddList onClose={closehandler} />}
    </div>
  );
};

export default TodoList;
