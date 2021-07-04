/* eslint-disable no-use-before-define */
// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
const loadEventListeners = () => {
	// DOM Load event
	document.addEventListener('DOMContentLoaded', getTasks);

	// Add task event
	form.addEventListener('submit', addTask);

	// Remove task event
	taskList.addEventListener('click', removeTask);

	// Clear task event
	clearBtn.addEventListener('click', clearTasks);

	// Filter tasks event
	filter.addEventListener('keyup', filterTasks);
};

// Get Tasks from LS
const getTasks = () => {
	let tasks;
	tasks =
		localStorage.getItem('tasks') === null
			? []
			: JSON.parse(localStorage.getItem('tasks'));

	tasks.forEach((task) => {
		// Create li element
		const li = document.createElement('li');

		// Add class
		li.className = 'collection-item';

		// Create text node and append to li
		li.appendChild(document.createTextNode(task));

		// Create new link element
		const link = document.createElement('a');

		// Add class
		link.className = 'delete-item secondary-content';

		// Add icon html
		link.innerHTML = '<i class="fa fa-remove"></i>';

		// Append the link to li
		li.appendChild(link);

		// Append li to ul
		taskList.appendChild(li);
	});
};

// Add Task
const addTask = (e) => {
	if (taskInput.value === '') {
		alert('Add a task');
	}
	// Create li element
	const li = document.createElement('li');

	// Add class
	li.className = 'collection-item';

	// Create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));

	// Create new link element
	const link = document.createElement('a');

	// Add class
	link.className = 'delete-item secondary-content';
	// Add icon html

	link.innerHTML = '<i class="fa fa-remove"></i>';
	// Append the link to li
	li.appendChild(link);

	// Append li to ul
	taskList.appendChild(li);

	// Store in LS
	storeTaskInLocalStorage(taskInput.value);

	// Clear input
	taskInput.value = '';

	e.preventDefault();
};

// Store Task
const storeTaskInLocalStorage = (task) => {
	let tasks;
	tasks =
		localStorage.getItem('tasks') === null
			? []
			: JSON.parse(localStorage.getItem('tasks'));

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Remove Task
const removeTask = (e) => {
	if (
		e.target.parentElement.classList.contains('delete-item') &&
		confirm('Are You Sure?')
	) {
		e.target.parentElement.parentElement.remove();

		// Remove from local storage
		removeTaskFromLocalStorage(e.target.parentElement.parentElement);
	}
};

// Remove from LS
const removeTaskFromLocalStorage = (taskItem) => {
	let tasks;
	tasks =
		localStorage.getItem('tasks') === null
			? []
			: JSON.parse(localStorage.getItem('tasks'));

	tasks.forEach((task, index) => {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Clear Tasks
const clearTasks = () => {
	// taskList.innerHTML = '';

	// Faster
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// Clear from LS
	clearTasksFromLocalStorage();
};

// Clear Tasks from LS
const clearTasksFromLocalStorage = () => {
	localStorage.clear();
};

// Filter Tasks
const filterTasks = (e) => {
	const text = e.target.value.toLowerCase();
	document.querySelectorAll('.collection-item').forEach((task) => {
		const item = task.firstChild.textContent;
		task.style.display =
			item.toLowerCase().indexOf(text) != -1 ? 'block' : 'none';
	});
};
