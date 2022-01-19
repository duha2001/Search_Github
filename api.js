class api {
  constructor() {
    this.client_id = "2f7de0671f42a567938d";
    this.client_secret = "a1fc6cb2100cae2da5d7244e75e86a8a9af5a499";
  }
  async getUser(username) {
    const profile = fetch(
      `https://api.github.com/users/${username}?client_id=${this.client_id}&client_secret =${this.client_secret}`
    ).then(async (res) => {
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
      return res.json();
    });
    const repos = fetch(
      `https://api.github.com/users/${username}/repos?client_id=${this.client_id}&client_secret=${this.client_secret}`
    ).then(async (res) => {
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
      return res.json();
    });
    const [resProfile, resRepos] = await Promise.all([profile, repos]);
    return {
      profile: resProfile,
      repos: resRepos,
    };
  }
}
