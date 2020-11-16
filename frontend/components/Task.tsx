import React, { useState } from "react";

const Task = ({ task, deleteTask, updateTask }) => {
  const [edit, setEdit] = useState(false);
  const [newTask, setNewTask] = useState("");

  const taskToggle = () => {
    const updatedTask = { ...task, isDone: !task.isDone };
    updateTask(updatedTask);
  };

  const editTask = (updatedTodo) => {
    const updatedTask = { ...task, todo: updatedTodo };
    updateTask(updatedTask);
  };

  const onSubmit = () => {
    editTask(newTask);
    setNewTask("");
  };

  return (
    <div>
      <li className="todo stack-small" key={`task-${task._id}`}>
        {edit ? (
          <form className="stack-small" onSubmit={onSubmit}>
            <div className="form-group">
              <label className="todo-label" htmlFor={`todo-${task._id}`}>
                New name for {task.todo}
              </label>
              <input
                id={`todo-${task._id}`}
                className="todo-text"
                type="text"
                onChange={(e) => {
                  setNewTask(e.target.value);
                }}
              />
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setEdit((prevEdit) => !prevEdit);
                }}
              >
                cancel
                <span className="visually-hidden">editing {task.todo}</span>
              </button>
              <button type="submit" className="btn btn__danger">
                Save <span className="visually-hidden">{task.todo}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="stack-small">
            <div className="c-cb">
              <input
                id={`todo-${task._id}`}
                type="checkbox"
                defaultChecked={task.isDone}
                onChange={taskToggle}
              />
              <label className="todo-label" htmlFor={`todo-${task._id}`}>
                {task.todo}
              </label>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn"
                onClick={() => setEdit((prevEdit) => !prevEdit)}
              >
                Edit <span className="visually-hidden">{task.todo}</span>
              </button>
              <button
                type="button"
                className="btn btn__danger"
                onClick={() => deleteTask(task._id)}
              >
                Delete <span className="visually-hidden">{task.todo}</span>
              </button>
            </div>
          </div>
        )}
      </li>
    </div>
  );
};

export default Task;
