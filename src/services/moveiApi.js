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
    console.log(totalPages);
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
}
