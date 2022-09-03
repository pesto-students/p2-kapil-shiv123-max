import React, { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);

  const addTodoItem = (todo) => {
    if (!todo.text) {
      return;
    }

    const newTodos = [todo, ...todoList];

    setTodoList(newTodos);
  };

  const completeTodoItem = (id) => {
    let updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    setTodoList(updatedTodos);
  };

  const updateTodoContent = (todoId, newValue) => {
    if (!newValue.text) {
      return;
    }

    setTodoList((prevList) =>
      prevList.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodoItem = (id) => {
    const removedTodosList = [...todoList].filter((todo) => todo.id !== id);

    setTodoList(removedTodosList);
  };

  return (
    <div>
      <h1>What is the plan today?</h1>
      <TodoForm onSubmit={addTodoItem} />
      <Todo
        todoList={todoList}
        completeTodoItem={completeTodoItem}
        removeTodoItem={removeTodoItem}
        updateTodoContent={updateTodoContent}
      />
    </div>
  );
};

export default TodoList;
