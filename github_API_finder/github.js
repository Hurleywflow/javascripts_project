class Github {
	constructor() {
		this.client_id = 'bceb3193f0e354be968e';
		this.client_secret = '90e7a3c93af2aada94ae24b5e1e8ef126a1d94c9';
		this.repos_count = 5;
		this.repos_sort = 'created: asc';
	}

	async getUser(user) {
		const profileResponse = await fetch(
			`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
		);
		const reposResponse = await fetch(
			`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
		);
		const profile = await profileResponse.json();
		const repos = await reposResponse.json();

		// Return object not only data itself
		return {
			profile,
			repos,
		};
	}
}
