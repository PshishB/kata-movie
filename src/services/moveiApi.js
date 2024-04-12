export default class MoveApi {
  apiBase = 'https://api.themoviedb.org/3/search/movie?query=';
  apiKey = '&api_key=8fba1a7479e07c417364714cf3baa6c1';

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}${this.apiKey}`);
    if (!res.ok) {
      throw new Error('cnt fetch url');
    }
    const t = await res.json();
    const body = t.results;
    return body;
  }

  async getMovies(id) {
    const res = await this.getResource(id);
    return res;
  }
  async getGenres() {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=8fba1a7479e07c417364714cf3baa6c1');
    if (!res.ok) {
      throw new Error('cant fetch url');
    }
    const data = await res.json();
    return data.genres;
  }
}
