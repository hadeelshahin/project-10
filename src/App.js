import logo from "./logo.svg";
import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { AiFillDelete } from "react-icons/ai";

import { BsCheckCircle } from "react-icons/bs";

function App() {
  const [isCompleteScreen, setIsComleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoIteam = {
      title: newTitle,
      description: newDescription,
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoIteam);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };
  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + mm + "-" + yyyy + "at" + h + ":" + m + ":" + s;

    let filteredIteam = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredIteam);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
  };
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
  }, []);
  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todowrapper">
        <div className="todoinput">
          <div className="todoinputiteam">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title"
            />
          </div>
          <div className="todoinputiteam">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Write the task description"
            />
          </div>
          <div className="todoinputiteam">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
        <div className="btnarea">
          <button
            className={`secondBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsComleteScreen(false)}
          >
            {" "}
            Todo
          </button>
          <button
            className={`secondBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsComleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todolist">
          {isCompleteScreen === false &&
            allTodos.map((iteam, index) => {
              return (
                <div className="todolistiteam" key={index}>
                  <div>
                    <h3>{iteam.title}</h3>
                    <p>{iteam.description}</p>
                  </div>
                  <div>
                    <AiFillDelete
                      className="icon"
                      onClick={() => handleDeleteTodo(index)}
                      title="Delete?"
                    />
                    <BsCheckCircle
                      className="chech-icon"
                      onClick={() => handleComplete(index)}
                      title="Complete?"
                    />
                  </div>
                </div>
              );
            })}

          {isCompleteScreen === true &&
            completedTodos.map((iteam, index) => {
              return (
                <div className="todolistiteam" key={index}>
                  <div>
                    <h3>{iteam.title}</h3>
                    <p>{iteam.description}</p>
                    <p>
                      <small>completed On:{iteam.completedOn}</small>
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
