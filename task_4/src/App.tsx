import { useState, useEffect, Key } from 'react';
import './App.css';

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

  function handleClick() {
    if (tasks.includes(value) || value === '') {
      setValue('');
      return;
    }
    const updatedTasks = [...tasks, value];
    setTasks(updatedTasks);
    setValue('');
  }

  function Task({ val }: { val: string }) {
    const [x, setX] = useState(val);
    return (
      <div className="add">
        <input
          type="text"
          value={x}
          onChange={(e) => setX(e.target.value)}
        />
        <button
          id={val}
          className="delete"
          onClick={() => deleteItem(val)}
        >
          Delete
        </button>
        <button
          id={val}
          className="update"
          onClick={() => updateItem(val, x)}
        >
          Update
        </button>
      </div>
    );
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
            onChange={(e) => setValue(e.target.value)}
          />
          <button id="add" onClick={handleClick}>
            add
          </button>
        </div>
        <div id="tasks">
          {tasks.map((task: string, index: Key | null | undefined) => (
            <Task val={task} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
