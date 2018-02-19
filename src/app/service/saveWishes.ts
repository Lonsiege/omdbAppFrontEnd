import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Wish} from '../model/Wish';

@Injectable()
export class WishesService {
  constructor(private http: HttpClient) {
  }

  sendWishes(wish: Wish) {
    const postWishes = 'http://localhost:8080/setwishes';
    return this.http.post(postWishes, wish);
  }

}
