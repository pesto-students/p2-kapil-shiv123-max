import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const Todo = ({ todoList, completeTodoItem }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  return todoList.map((todo, index) => (
    <div
      className={todo.isComplete ? "todoRow complete" : "todoRow"}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodoItem(todo.id)}>
        {todo.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine />
        <TiEdit />
      </div>
    </div>
  ));
};

export default Todo;
