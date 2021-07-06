const getDays = new Date().getDay()
switch (getDays) {
	case 1:
		day = 'Monday';
		break;
	case 2:
		day = 'Tuesday';
		break;
	case 3:
		day = 'Wednesday';
		break;
	case 4:
		day = 'Thursday';
		break;
	case 5:
		day = 'Friday';
		break;
	case 6:
		day = 'Saturday';
		break;
	default:
		day = 'Sunday';
    break;
}
const list = document.querySelector('#book-list ul');
list.addEventListener('click', e => {
	if (e.target.className === 'delete') {
		const li = e.target.parentElement;
		list.removeChild(li);
	}
});

// add the book list

const addForm = document.querySelector('#add-book');
addForm.addEventListener('submit', e => {
	e.preventDefault();
	const value = addForm.querySelector('input[type=text]').value;
	// createElement
	const li = document.createElement('li');
	const bookName = document.createElement('span');
	const deleteBtn = document.createElement('span');
	// add content to document
	deleteBtn.textContent = 'delete';
	bookName.textContent = value;
	// add class to elements
	// or we want remove class className.remove();
	bookName.classList.add('name');
	deleteBtn.classList.add('delete');
	// append to document
	li.appendChild(bookName);
	li.appendChild(deleteBtn);
	list.appendChild(li);
});

// hide the book list

const list = document.querySelector('#book-list ul');
const hideBox = document.querySelector('#hide');
hideBox.addEventListener('change', e => {
	if (hideBox.checked) {
		list.style.display = 'none';
	} else {
		list.style.display = 'initial';
	}
});

//filter books in the input search

const list = document.querySelector('#book-list ul');
const searchBar = document.forms('search-books').querySelector('input');
searchBar.addEventListener(keyup, e => {
	const termInput = e.target.value.toLowerCase();
	const books = list.getElementsByTagName('li');
	Array.from(books).forEach(book => {
		const title = book.firstElementChild.textContent;
		if (title.toLowerCase().indexOf(termInput) !== -1) {
			// -1 that means the book title when we search not in the book list.
			book.style.display = 'block';
		} else {
			book.style.display = 'none';
		}
	});
});

//tabbed content

const tabs = document.querySelector('.tabs');
const panels = document.querySelectorAll('.panel');
tabs.addEventListener(click, e => {
	if (e.target.tagName == 'LI') {
		const targetPanel = document.querySelector(e.target.dataset.target);
		//dataset.target because in html have data-target
		panels.forEach(panel => {
			if ((panel = targetPanel)) {
				panel.classList.add('active');
			} else {
				panel.classList.remove('active');
			}
		});
	}
});
