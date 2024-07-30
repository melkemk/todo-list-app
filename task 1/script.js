let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let _set = new Set();
let last = 0;

const add = () => {
    const task = document.getElementsByName('task')[0].value;
    const id = last + 1;
    const obj = { id, task };
    if (_set.has(task)) return;
    tasks.push(obj);
    _set.add(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    display(task, id);
    last = id;
};

function display(task, id) {
    const deleteButton = document.createElement('button');
    const updateButton = document.createElement('button');

    deleteButton.id = 'delete';
    deleteButton.addEventListener('click', function() {
        _delete(this);
    });

    deleteButton.textContent = 'delete';
    updateButton.textContent = 'update';
    updateButton.id = 'update';
    updateButton.addEventListener('click', update(this))

    const main = document.createElement('div');
    const inp = document.createElement('input');
    inp.value = task;
    inp.id = id;
    inp.addEventListener('change', function() {
        update(this);
    });

    main.appendChild(inp);
    main.appendChild(deleteButton);
    main.appendChild(updateButton);
    main.className = 'add'
    document.getElementById('tasks').appendChild(main);
}

const _delete = (element) => {
    const parent = element.parentElement;
    const task = parent.querySelector('input').value;
    tasks = tasks.filter(t => t.task !== task);
    _set.delete(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    parent.remove();

};

const update = (element) => {
    const id = parseInt(element.id, 10);
    const task = element.value;
    _set.delete(task);
    tasks = tasks.map(t => t.id === id ? { id, task } : t);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

document.getElementById('add').addEventListener('click', add);

window.onload = () => {
    tasks.forEach(task => {
        _set.add(task.task);
        last = Math.max(last, task.id);
        display(task.task, task.id);
    });
};

