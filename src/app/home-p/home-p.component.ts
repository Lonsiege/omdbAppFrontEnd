import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../model/MovieSimple';
import {MoviesService} from '../service/getMovies';
import {NgForm} from '@angular/forms';
import {GetWishesService} from '../service/getWishes';
import 'rxjs/add/operator/map';

export interface IPrimModel {
  success: string;
  data: any;
}

@Component({
  selector: 'epoch-movies',
  templateUrl: './home-p.component.html',
  styleUrls: ['./home-p.component.scss'],
  providers: [MoviesService, GetWishesService]
})

export class HomePComponent implements OnInit {

  title = 'WEISS CINEMA';
  movies: Movie[];
  searchVal;
  // isValid = true;
  divPanel = 'Your Wishlist';

  constructor(private _moviesService: MoviesService, private _getWishesService: GetWishesService) {
  }

  ngOnInit() {
    let user = '127.0.0.1'; // here should be token if we are using auth
    this._getWishesService.getWishes(user).subscribe(
      (data: IPrimModel) => {
        if (data.success === 'true') {
          // let results: Movie[];
          this.movies = data.data
            .map(res => {
              if (res.Poster === 'N/A') {
                res.Poster = 'assets/poster_no_2.jpg';
              }
              return res;
            });
          /*for ( let i = 0 ; i < results.length; i++) {
            if (results[i].Poster === 'N/A') {
              results[i].Poster = 'assets/poster_no_2.jpg';
            }
          }*/
        }
      },
      err => console.error(err),
      () => console.log('results loaded')
    );
  }

  onFormSubmit(form: NgForm) {
    let search: string = form.controls['searchVal'].value;
    if (search) {
      this.getDbData(search);
    }


  }

  autoFill(value) {
    if (value) {
      let searchLength = value.length;
      console.log(searchLength);
      if (searchLength >= 3) {
        this.getDbData(value);
      }
    }
  }

  getDbData(search: string) {
    this._moviesService.getMovies(search).subscribe(
      (data: IPrimModel) => {
        let results: Movie[];
        if (data.success === 'true') {
          // let results: Movie[];
          results = data.data
            .map(res => {
              if (res.Poster === 'N/A') {
                res.Poster = 'assets/poster_no_2.jpg';
              }
              return res;
            });
          this.divPanel = 'Search Results for " ' + search + ' " ';
        } else {
          this.divPanel = 'No such movie. Sorry :-/';
        }
        this.movies = results;

      },
      err => console.error(err),
      () => console.log('results loaded')
    );
  }

}
