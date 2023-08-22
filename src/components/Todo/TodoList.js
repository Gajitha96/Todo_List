import React, { useContext, useState, useEffect } from "react";
import TodoContext from "../../store/TodoContext";
import axios from "axios";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";

const headers = {
  Authorization: "Bearer Pr78IUW4ZAIiXBBOgj0l7WIy8eC-b-WYFi4V4SbkzsdeV22eeg",
  "Content-Type": "application/json",
};

const TodoList = (props) => {
  const [isLoad, setIsLoad] = useState(false);
  const todoCtx = useContext(TodoContext);

  useEffect(() => {
    setIsLoad(true);
    axios
      .get("/api/v1/task", { headers })
      .then((response) => {
        console.log(response.data.items);
        const responseData = response.data.items;
        const loadedTodos = [];

        for (const key in responseData) {
          console.log("GET");
          loadedTodos.push({
            id: responseData[key]._uuid,
            name: responseData[key].name,
            status: responseData[key].status,
          });
        }
        console.log(loadedTodos);
        todoCtx.addItem(loadedTodos);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoad(false);
  }, []);


  const deleteTodo = (id) => {
    console.log("Delete:", id);
    axios
      .delete("/api/v1/task/" + id, { headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    todoCtx.removeItem(id);
  };
  console.log(todoCtx.items);


  const updateTodo = (id) => {
    console.log("Update:", id);
    const todo = { status: true };
    axios
      .put("/api/v1/task/" + id, todo, { headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    const updatedTodo = { id: id, status: true };
    todoCtx.updateItem(updatedTodo);
  };

  if (isLoad) {
    return <p>Loading.......</p>;
  }

  if (todoCtx.items.length === 0) {
    return <div>No Todo avilable </div>;
  }

  return (
    <Card>
      {todoCtx.items.map((item) => (
        <li key={item.id}>
          {item.name}
          <IconButton aria-label="delete" onClick={() => deleteTodo(item.id)}>
            <DeleteIcon />
          </IconButton>
          <Checkbox onChange={() => updateTodo(item.id)} />
        </li>
      ))}
    </Card>
  );
};

export default TodoList;
