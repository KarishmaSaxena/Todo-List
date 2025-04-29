import React, { useState } from "react";
import "./ToDoList.css";

function ToDOList() {
  const [task, setTask] = useState([]);
  const [newTask, setnewTask] = useState({ tasktitle: " ", description: " ", date: " ", time: " " });
  const [deletedTask, setDelete] = useState(null);

  const handleChange = (e) => {
    setnewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const AddTask = () => {
    if (newTask.tasktitle && newTask.description && newTask.date && newTask.time) {
      if (deletedTask !== null) {
        const updatedTask = [...task];
        updatedTask[deletedTask] = { ...newTask, completed: false };
        setTask(updatedTask);
        setDelete(null);
      }
      else {
        setTask([...task, { ...newTask, completed: false }]);
      }
      setnewTask({ tasktitle: "", description: "", date: "", time: "" });
    }
  };

  const removeTask = (index) => {
    setTask(task.filter((_, i) => i !==index));
  };

  const editTask = (index) => {
    setnewTask(task[index]);
    setDelete(index);
  };

  const markDone = (index) => {
    const updatedTask = [...task];
    updatedTask[index].completed = !updatedTask[index].completed;
    setTask(updatedTask);

  };

  return (
    <div className="todo-wrap ">
      <div className="todo-heading">To-Do List</div>
      <div className="tasks">
        <div className="todo-box">
          <input type="text" name="tasktitle" className="todo-input" value={newTask.tasktitle} onChange={handleChange} />
        <div>
          <input
            type="text"
            name="description"
            className="todo-description"
            placeholder=" Enter Description"
            value={newTask.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <input type="date" name="date" className="date-input" placeholder="date" value={newTask.date} onChange={handleChange} />
        </div>
        <div>
          <input type="time" name="time" className="time-input" placeholder="time" value={newTask.time} onChange={handleChange} />
        </div>
        <button className="add-btn" placeholder="Add" onClick={AddTask}>
          {deletedTask != null ? "update" : "Add"}
        </button>
        </div>
        <div>
          <ul className="list-group">
            {task.map((t, index) => (
              <li
                key={index}
                className={`list-group-items d-flex justify-content-between align-items-center  ${t.completed ? "completed-task" : " "}`}
              >
                <div className="todo-lists d-flex">
                 Title -{t.tasktitle} - Description - {t.description} - Date - {t.date} - Time - {t.time}
                </div>
                <div className="todo-list-btn">
                  <button className="edit-btn" onClick={(() => editTask(index))}>Edit</button>
                  <button className="delete-btn" onClick={(() => removeTask(index))}>Delete</button>
                  <button className="done-btn" onClick={() => markDone(index)}>{t.completed ? "Undo" : "Done"}</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div >
  );
}
export default ToDOList;
