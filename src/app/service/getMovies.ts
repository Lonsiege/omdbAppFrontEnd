import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient) {
  }

  getMovies(name: string) {
    const getMovies = 'http://localhost:8080/getmovies?name=' + name;
    return this.http.get(getMovies);
  }
}
