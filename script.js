const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const btn = document.getElementById('themeBtn');
btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const currentTheme = document.body.classList.contains('dark')
        ? 'dark'
        : 'light';
    localStorage.setItem('theme', currentTheme);
});
// Перевірка теми при завантаженні
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
});
// Відображення списку задач
function renderTasks() {
    taskList.innerHTML = '';
        if (tasks.length === 0) {
        taskCount.textContent = '';  // (приховати лічильник)
        return;                      // (не показуємо список)
    }
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.done) li.classList.add('done');
            //  (2) Відмітити як виконане
        li.addEventListener('click', () => {
            tasks[index].done = !tasks[index].done;
            updateStorage();
            renderTasks();
        });
        const removeBtn = document.createElement('span');
        removeBtn.textContent = '✖';
        removeBtn.className = 'remove';
        removeBtn.onclick = () => {
            tasks.splice(index, 1);
            updateStorage();
            renderTasks();
        };
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    });
// (3) Підрахунок задач
    taskCount.textContent = `(${tasks.length})`;
}
// Оновлення localStorage
function updateStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Показати задачі при завантаженні
window.addEventListener('load', renderTasks);
// Додати задачу
addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text !== '') {
        tasks.push({ text, done: false });
        updateStorage();
        renderTasks();
        taskInput.value = '';
    }
});