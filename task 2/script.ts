let tasks = JSON.parse(localStorage.getItem('tasks') || "[]");
let _set: Set<string> = new Set();
let last:number = 0;

type Task = {  id: number, task: string }

const add = () => {
    const task:string = (document.getElementsByName('task')[0] as HTMLInputElement).value;
    (document.getElementsByName('task')[0] as HTMLInputElement).value = '';
    const id :number= last + 1;
    const obj = { id, task };
    if (_set.has(task)) return;
    tasks.push(obj);
    _set.add(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    display(task, id);
    last = id;
};

function display(task:string, id:number) {
    const deleteButton = document.createElement('button');
    const updateButton = document.createElement('button');

    deleteButton.id = 'delete';
    deleteButton.addEventListener('click', function() {
        _delete(this);
    });

    deleteButton.textContent = 'delete';
    updateButton.textContent = 'update';
    updateButton.id = 'update';
    updateButton.addEventListener('click',()=> update(updateButton)) 

    const main = document.createElement('div');
    const inp = document.createElement('input');
    inp.value = task;
    inp.id = String(id);
    inp.addEventListener('change', function() {
        update(this);
    });

    main.appendChild(inp);
    main.appendChild(deleteButton);
    main.appendChild(updateButton);
    main.className = 'add'
    const tasksElement :HTMLElement|null= document.getElementById('tasks');
    if (tasksElement !== null) {
        tasksElement.appendChild(main);
    }
}

const _delete = (element:HTMLElement) => {
    const parent:HTMLElement|null = element.parentElement;
    const inputElement = parent!==null? parent.querySelector('input') :'';
    const task = inputElement !== null ? (inputElement  as HTMLInputElement).value : '';
    tasks = tasks.filter((t: { task: string,id:number }) => t.task !== task);
    _set.delete(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    parent?.remove();

};

const update = (element:HTMLElement) => {
    const id = parseInt(element.id, 10);
    const task = (element as HTMLInputElement).value;
    _set.delete(task);
    tasks = tasks.map((t:Task) => t.id === id ? { id, task } : t);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

document.getElementById('add')?.addEventListener('click', add);

window.onload = () => {
    tasks.forEach((task: Task) => {
        _set.add(task.task);
        last = Math.max(last, task.id);
        display(task.task, task.id);
    });
};

