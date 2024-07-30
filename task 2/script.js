"use strict";
var _a;
var tasks = JSON.parse(localStorage.getItem('tasks') || "[]");
var _set = new Set();
var last = 0;
var add = function () {
    var task = document.getElementsByName('task')[0].value;
    document.getElementsByName('task')[0].value = '';
    var id = last + 1;
    var obj = { id: id, task: task };
    if (_set.has(task))
        return;
    tasks.push(obj);
    _set.add(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    display(task, id);
    last = id;
};
function display(task, id) {
    var deleteButton = document.createElement('button');
    var updateButton = document.createElement('button');
    deleteButton.id = 'delete';
    deleteButton.addEventListener('click', function () {
        _delete(this);
    });
    deleteButton.textContent = 'delete';
    updateButton.textContent = 'update';
    updateButton.id = 'update';
    updateButton.addEventListener('click', function () { return update(updateButton); });
    var main = document.createElement('div');
    var inp = document.createElement('input');
    inp.value = task;
    inp.id = String(id);
    inp.addEventListener('change', function () {
        update(this);
    });
    main.appendChild(inp);
    main.appendChild(deleteButton);
    main.appendChild(updateButton);
    main.className = 'add';
    var tasksElement = document.getElementById('tasks');
    if (tasksElement !== null) {
        tasksElement.appendChild(main);
    }
}
var _delete = function (element) {
    var parent = element.parentElement;
    var inputElement = parent !== null ? parent.querySelector('input') : '';
    var task = inputElement !== null ? inputElement.value : '';
    tasks = tasks.filter(function (t) { return t.task !== task; });
    _set.delete(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    parent === null || parent === void 0 ? void 0 : parent.remove();
};
var update = function (element) {
    var id = parseInt(element.id, 10);
    var task = element.value;
    _set.delete(task);
    tasks = tasks.map(function (t) { return t.id === id ? { id: id, task: task } : t; });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
(_a = document.getElementById('add')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', add);
window.onload = function () {
    tasks.forEach(function (task) {
        _set.add(task.task);
        last = Math.max(last, task.id);
        display(task.task, task.id);
    });
};
