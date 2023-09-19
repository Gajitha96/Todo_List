import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import { useTodoContext } from "../../../store/provider/TodoContextProvider";
import TodoList from "./TodoList";
import styles from "./Todo.module.css";
import AddList from "./AddList";

const Todo = () => {
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [state, dispatchActions] = useTodoContext();

  useEffect(() => {
    dispatchActions.fetchTodoItem();
  }, [state.refreshState]);

  const openHandler = () => {
    setShowAddTodo(true);
  };

  const closehandler = () => {
    setShowAddTodo(false);
  };

  return (
    <div className={styles.container}>
        <div className={styles.add}>
        <button className={styles.addButton} onClick={openHandler}>
          Add New <FaPlus className={styles.addIcon} />
        </button>
      </div>
      {showAddTodo && <AddList onClose={closehandler} />}
      <TodoList todoItem={state.todoItem} />
      <br />
    </div>
  );
};

export default Todo;
