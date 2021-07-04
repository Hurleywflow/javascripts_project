// Instantiate GitHub and UI classes
const github = new Github();
const ui = new UI();

// search input
const searchUser = document.getElementById('searchUser');

// search input event listener
searchUser.addEventListener('keyup', (e) => {
	// Get input test
	const userText = e.target.value;
	if (userText !== '') {
		// Make http call
		github.getUser(userText).then((data) => {
			switch (data.profile.message) {
				case 'Not Found':
					// Show alert
					ui.showAlert('User not found', 'alert alert-danger');
					break;
				default:
					// Show profile
					ui.showProfile(data.profile);
					ui.showRepos(data.repos);
					break;
			}
		});
	} else {
		// Clear profile
		ui.clearProfile();
	}
});
