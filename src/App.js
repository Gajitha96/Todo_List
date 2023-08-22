import React, { useState } from "react";
import Header from "./components/Header/Header";
import AddList from "./components/Todo/AddList";
import TodoList from'./components/Todo/TodoList';
import TodoProvider from "./store/TodoProvider";
import Button from '@mui/material/Button';



function App() {
  const [show, setShow] = useState(false);
  

  const addHandler = () => {
    setShow(true);
  };

  const closeHandler = () => {
    setShow(false);
  };

 

  return (
    <TodoProvider>
      <Header />
      <hr/>
      {!show &&    <Button onClick={addHandler} variant="contained" style={{ marginLeft: "auto" }}>Add +</Button>}
      {show && <AddList onClose={closeHandler} />}
      <TodoList />
    </TodoProvider>
  );
}

export default App;
