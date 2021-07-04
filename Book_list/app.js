// Book constructor
const Book = (title, author, isbn) => {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
};

// UI constructor
const UI = () => {};

// Add book to list
UI.prototype.addBookToList = (book) => {
	const list = document.getElementById('book-list');

	// Create tr element
	const row = document.createElement('tr');

	// Insert cols
	row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`;
	list.appendChild(row);
};

// Delete book
UI.prototype.deleteBook = (target) => {
	if (target.className === 'delete') {
		target.parentElement.parentElement.remove();
	}
};
// Clear fields
UI.prototype.clearFields = () => {
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
};

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', (e) => {
	// Get form values
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const isbn = document.getElement('isbn').value;

	// Instantiate book
	const book = new Book(title, author, isbn);

	// Instantiate UI
	const ui = new UI();

	// Show alert
	UI.prototype.showAlert = (message, className) => {
		// Create div
		const div = document.createElement('div');

		// Add classes
		div.className`alert ${className}`;

		// Add text
		div.appendChild(document.createTextNode(message));

		// Get parent
		const container = document.getElementById('container');
		const form = document.getElementById('book-form');

		// Insert alert
		container.insertBefore(div, form);

		// Time out after 3 seconds
		setTimeout(() => {
			document.getElementById('alert').remove();
		}, 3000);
	};

	// Validate
	if (title === '' || author === '' || isbn === '') {
		// Error alert
		ui.showError('Please fill all fields', 'error');
	} else {
		// Add book to list
		ui.addBookToList(book);

		// Show success
		ui.showAlert('Book Added', 'success');

		// Cleat field
		ui.clearFields();
	}

	e.preventDefault();
});

// Even listener for delete
document.getElementById('book-list').addEventListener('click', (e) => {
	// Instantiate UI
	const ui = new UI();

	// Delete book
	ui.deleteBook(e.target);

	// Show message
	ui.showAlert('Book Deleted', 'success');

	e.preventDefault();
});
