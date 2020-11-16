import React, { useEffect, useState } from "react";
import { API_URL } from "../config/env.json";
import Task from "./Task";

const Todo = () => {
  API_URL;
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showTasks, setShowTasks] = useState("all");
  useEffect(() => {
    getAllTasks();
    return () => {};
  }, []);

  const getTasks = (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((jsonData) => {
        setTasks(jsonData);
      });
  };

  const getAllTasks = () => {
    getTasks(`${API_URL}/todos`);
    setShowTasks("all");
  };
  const getActiveTasks = () => {
    getTasks(`${API_URL}/todos/active`);
    setShowTasks("active");
  };

  const getCompletedTasks = () => {
    getTasks(`${API_URL}/todos/completed`);
    setShowTasks("completed");
  };

  const getSelectedTasks = () => {
    switch (showTasks) {
      case "all":
        getAllTasks();
        break;
      case "active":
        getActiveTasks();
        break;
      case "completed":
        getCompletedTasks();
        break;
      default:
        break;
    }
  };

  const addTask = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/todo`, {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ todo: newTask, isDone: false }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          getSelectedTasks();
          setNewTask("");
        }
      });
  };

  const deleteTask = (taskId) => {
    fetch(`${API_URL}/todo`, {
      method: "DELETE",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ id: taskId }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        getSelectedTasks();
      });
  };

  const updateTask = (task) => {
    fetch(`${API_URL}/todo/${task._id}`, {
      method: "PUT",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        getSelectedTasks();
      });
  };

  return (
    <div className="todoapp stack-large">
      <form onSubmit={addTask}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
      <div className="filters btn-group stack-exception">
        <button
          type="button"
          className="btn toggle-btn"
          aria-pressed="true"
          onClick={getAllTasks}
        >
          <span className="visually-hidden">Show </span>
          <span>all</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button
          type="button"
          className="btn toggle-btn"
          aria-pressed="false"
          onClick={getActiveTasks}
        >
          <span className="visually-hidden">Show </span>
          <span>Active</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button
          type="button"
          className="btn toggle-btn"
          aria-pressed="false"
          onClick={getCompletedTasks}
        >
          <span className="visually-hidden">Show </span>
          <span>Completed</span>
          <span className="visually-hidden"> tasks</span>
        </button>
      </div>
      <h2 id="list-heading">{tasks.length} tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {tasks.map((task, index) => (
          <Task
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
            key={`task-${index}`}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todo;
