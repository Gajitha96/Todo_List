import { useState } from "react";

import styles from "./AddList.module.css";
import { useTodoContext } from "../../../store/provider/TodoContextProvider";

const AddList = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatchActions] = useTodoContext();

  const handleInputText = (event) => {
    setInput(event.target.value);
  };

  const submitHandler = async () => {
  
      setIsLoading(true);
      await dispatchActions.addTodoItem([{ input: input, completed: false }]);
      setIsLoading(false);
      onClose();
    
  };

  return (
    <div className={styles.container}>
      <div className={styles.itemcontainer}>
        <h2>Add New Item</h2>
        <input
          type="text"
          id="input"
          value={input}
          onChange={handleInputText}
        />
        <button className={styles.cancel} onClick={onClose}>CANCEL</button>
        <button onClick={submitHandler} disabled={!input}>
          {isLoading ? "Proccesing.." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default AddList;
