import { httpRequset } from "../../helpers/http-wrapper.helper"
import { getTodoListAPI } from "../../config/api-end-points";
import {
  pageLoaderStatusKey,
  refreshTodoDataKey,
  requestTodoDataKey,
} from "../../config/action-keys";

const fetchTodoItem = async (dispatch) => {
  dispatch({ type: pageLoaderStatusKey, payload: true });

  try {
    const response = await httpRequset(getTodoListAPI);
    dispatch({ type: pageLoaderStatusKey, payload: false });

    dispatch({ type: requestTodoDataKey, payload: response.items });
  } catch (error) {
    dispatch({ type: pageLoaderStatusKey, payload: false });

    console.error("Failed to fetch :", error);
    dispatch({ type: requestTodoDataKey, payload: [] });
  }
};

const addTodoItem = async (dispatch, body) => {
  console.log(body);
  try {
    const data = await httpRequset(getTodoListAPI, "POST", body);
    dispatch({
      type: refreshTodoDataKey,
    });
  } catch (error) {
    console.error("Failed to add :", error);
  }
};

const editTodoItem = async (dispatch, id) => {
  try {
    const data = await httpRequset(`${getTodoListAPI}/${id}`, "PUT", {
      completed: true,
    });
    dispatch({
      type: refreshTodoDataKey,
    });
  } catch (error) {
    console.error("Failed to edit :", error);
  }
};

const removeTodoItem = async (dispatch, id) => {
  try {
    const data = await httpRequset(`${getTodoListAPI}/${id}`, "DELETE");
    dispatch({
      type: refreshTodoDataKey,
    });
  } catch (error) {
    console.error("Failed to delete :", error);
  }
};

const todoActions = (dispatch) => {
  return {
    fetchTodoItem: () => fetchTodoItem(dispatch),
    addTodoItem: (body) => addTodoItem(dispatch, body),
    editTodoItem: (id) => editTodoItem(dispatch, id),
    removeTodoItem: (id) => removeTodoItem(dispatch, id),
  };
};

export { todoActions };
