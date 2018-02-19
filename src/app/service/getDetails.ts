import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DetailsService {
  constructor(private http: HttpClient) {
  }

  getDetails(name: string) {
    const getDetails = 'http://localhost:8080/details/get?name=' + name;
    return this.http.get(getDetails);
  }
}
