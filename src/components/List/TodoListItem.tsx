import React from "react";
import "./css/todos.css";
import { useDispatch } from "react-redux";

import { updateTodo, deleteTodo, Todo } from "../../stores/todoStore";

interface ITodoStoreProps {
  todo: Todo;
}
function TodoListItem(props: ITodoStoreProps) {
  const { todo } = props;
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{todo.id}</td>
      <td>
        <span className={todo.done ? "done" : ""}>{todo.text}</span>
      </td>
      <td>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(updateTodo(todo.id))}
        >
          Complete
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(deleteTodo(todo.id))}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
export default React.memo(TodoListItem);
