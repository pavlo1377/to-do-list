import React, { useState } from "react";
import "./App.css"; // Підключаємо стилі

function App() {
  const [taskList, setTaskList] = useState([]);

  function handleDeleteItem(id) {
    const updatedTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(updatedTaskList);
  }

  function handleToggleComplete(id) {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskList(updatedTaskList);
  }

  return (
    <div className="container">
      <Header />
      <ToDoForm taskList={taskList} setTaskList={setTaskList} />
      <ToDoList
        taskList={taskList}
        onDelete={handleDeleteItem}
        onToggleComplete={handleToggleComplete}
      />
      <Footer />
    </div>
  );
}

export default App;

function Header() {
  return (
    <div>
      <h1>ToDo List</h1>
    </div>
  );
}

function ToDoForm({ taskList, setTaskList }) {
  const [taskInput, setTaskInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!taskInput) return;

    const newTask = {
      id: Date.now(),
      description: taskInput,
      completed: false,
    };

    setTaskList([...taskList, newTask]);

    setTaskInput("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

function ToDoList({ taskList, onDelete, onToggleComplete }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = taskList;
  if (sortBy === "description") {
    sortedItems = taskList
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "completed") {
    sortedItems = taskList
      .slice()
      .sort((a, b) => Number(a.completed) - Number(b.completed));
  }

  return (
    <div>
      <ul>
        {sortedItems.map((task) => (
          <ToDoItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </ul>

      <div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="completed">Sort by completed status</option>
        </select>
      </div>
    </div>
  );
}

function ToDoItem({ task, onDelete, onToggleComplete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "",
          color: task.completed ? "gray" : "black",
        }}
      >
        {task.description}
      </span>
      <button className="delete" onClick={() => onDelete(task.id)}>
        ❌
      </button>
    </li>
  );
}

function Footer() {
  return <footer>© 2024 ToDo App</footer>;
}
