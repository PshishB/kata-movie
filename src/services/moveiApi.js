export default class MoveApi {
  apiBase = 'https://api.themoviedb.org/3/search/movie?query=';
  apiKey = '&api_key=8fba1a7479e07c417364714cf3baa6c1';

  async getResource(url, page = 1) {
    const res = await fetch(`${this.apiBase}${url}&page=${page}${this.apiKey}`);
    if (!res.ok) {
      throw new Error('cnt fetch url');
    }
    const t = await res.json();
    const totalPages = t['total_pages'];
    const body = t.results;
    return { body, totalPages };
  }

  async getMovies(id, page) {
    const { body, totalPages } = await this.getResource(id, page);
    return { movies: body, totalPages };
  }
  async getGenres() {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=8fba1a7479e07c417364714cf3baa6c1');
    if (!res.ok) {
      throw new Error('cant fetch url');
    }
    const data = await res.json();
    return data.genres;
  }

  async getGuestId() {
    const id = await fetch(
      'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=8fba1a7479e07c417364714cf3baa6c1'
    );
    const res = await id.json();
    return res.guest_session_id;
  }

  async postRate(id, value, movieId) {
    const url =
      'https://api.themoviedb.org/3/movie/' +
      movieId +
      '/rating?api_key=8fba1a7479e07c417364714cf3baa6c1&guest_session_id=' +
      id;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        movieId,
        value,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to add rating');
    }
    return await response.json();
  }

  async getRated(id, page = 1) {
    const response = await fetch(
      `https://api.themoviedb.org/3/guest_session/${id}/rated/movies?page=${page}&api_key=8fba1a7479e07c417364714cf3baa6c1`
    );
    const data = await response.json();
    return {
      movies: data.results,
      total_results: data.total_results,
    };
  }
}
