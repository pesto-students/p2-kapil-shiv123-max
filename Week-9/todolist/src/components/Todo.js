import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import TodoForm from "./TodoForm";

const Todo = ({
  todoList,
  completeTodoItem,
  removeTodoItem,
  updateTodoContent,
}) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodoContent(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todoList.map((todo, index) => (
    <div
      className={todo.isComplete ? "todoRow complete" : "todoRow"}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodoItem(todo.id)}>
        {todo.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          className="deleteIcon"
          onClick={() => removeTodoItem(todo.id)}
        />
        <TiEdit
          className="editIcon"
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
        />
      </div>
    </div>
  ));
};

export default Todo;
