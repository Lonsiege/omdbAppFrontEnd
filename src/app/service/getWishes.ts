import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GetWishesService {
  constructor(private http: HttpClient) {
  }

  getWishes(name: string) {
    const getWishes = 'http://localhost:8080/getwishes?name=' + name;
    console.log(getWishes);
    return this.http.get(getWishes);
  }
}
