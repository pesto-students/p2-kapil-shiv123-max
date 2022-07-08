import React, { useState } from "react";

const TodoForm = (props) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="todoForm">
        <input
          placeholder="Add a todo"
          value={input}
          type="text"
          name="text"
          onChange={handleChange}
          className="todoInput"
        />
        <button className="todoButton">Add todo</button>
      </form>
    </div>
  );
};

export default TodoForm;
