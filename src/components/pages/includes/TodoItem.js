import { FaTrash } from "react-icons/fa";

import { useTodoContext } from "../../../store/provider/TodoContextProvider";
import styles from "./TodoItem.module.css";

const TodoItem = ({ input, id, completed }) => {
  const [state, dispatchActions] = useTodoContext();

  const deleteTodo = async () => {
    await dispatchActions.removeTodoItem(id);
  };

  const editTodo = async () => {
    await dispatchActions.editTodoItem(id);
    console.log("UPDATE");
  };

  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoItem}>
        <input
          type="radio"
          className={styles.doneCheckbox}
          checked={completed}
          onChange={editTodo}
        />
        <p>{input}</p>
        <button className={styles.deleteButton} onClick={deleteTodo}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
