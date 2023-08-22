import React, { useContext, useState } from "react";
import TodoContext from "../../store/TodoContext";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./AddList.module.css";

const AddList = (props) => {
  const [userInput, setUserInput] = useState("");

  const todoCtx = useContext(TodoContext);

  const submitHandler = (event) => {
    event.preventDefault();
    setUserInput("");

    const todo = {
      id: Math.floor(Math.random() * 100),
      name: userInput,
      status: false,
    };
    const newTodo = todo[0];
    console.log(todo[0]);
    axios
      .post("/api/v1/task", [todo], {
        headers: {
          Authorization:
            "Bearer Pr78IUW4ZAIiXBBOgj0l7WIy8eC-b-WYFi4V4SbkzsdeV22eeg",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    todoCtx.addItem(todo);
  };


  const inputChangeHandler = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <form onSubmit={submitHandler} className={classes.input}>
      <div>
        <h3>Add New Item</h3>
      </div>
      <div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "30ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="todo"
            onChange={inputChangeHandler}
            type="text"
            value={userInput}
            variant="outlined"
          />
        </Box>
      </div>
      <div>
        <Button type="submit" variant="contained" disabled={userInput}>
          Add
        </Button>
        <Button onClick={props.onClose} color="error" variant="contained">
          cancel
        </Button>
      </div>
    </form>
  );
};

export default AddList;
