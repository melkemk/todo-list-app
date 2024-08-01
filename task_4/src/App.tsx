import { useState, useEffect, Key } from 'react';
import './App.css';
import Task from './components/Task';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
function App() {
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks !== null && savedTasks !== 'undefined') {
      return JSON.parse(savedTasks);
    }
    return [];
  });


  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function deleteItem(valu:string) {

    const updatedTasks = tasks.filter((val: string) => val !== valu);
    setTasks(updatedTasks);
  }

  function updateItem(oldVal:string, newVal:string) {
    const updatedTasks = tasks.map((val:string) => (val !== oldVal ? val : newVal));
    setTasks(updatedTasks);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleKeyDown(e: { key: string }) {
    if (e.key === 'Enter') {
      handleClick();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [value]);

  function handleClick() {
    if (tasks.includes(value) || value === '') {
      setValue('');
      return;
    }
    const updatedTasks = [...tasks, value];
    setTasks(updatedTasks);
    setValue('');
  }


  return (
    <>
      <h1>Task List</h1>
      <div className="container">
        <div className="add" id="mainadd">
          <input
            type="text"
            placeholder="task"
            name="task"
            value={value}
            onKeyDown={handleKeyDown}
            onChange={(e) => setValue(e.target.value)}
          />
          <button id="addd" onClick={handleClick}>
          <FontAwesomeIcon icon={faPlus as IconProp} style={{ color: 'green' }} />
          </button>
        </div>
        <div id="tasks">
          {tasks.map((task: string, index: Key | null | undefined) => (
            <Task val={task} key={index} updateItem={updateItem} deleteItem={deleteItem} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
