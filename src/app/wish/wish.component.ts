import {Component, Input, OnInit} from '@angular/core';
import {WishesService} from '../service/saveWishes';
import {Wish} from '../model/Wish';

export interface IPrimModel {
  success: string;
  data: any;
}

@Component({
  selector: 'epoch-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.scss'],
  providers: [WishesService]
})
export class WishComponent implements OnInit {
  @Input()  wishId;
  wished: string;

  constructor(  private _wishService: WishesService ) { }

  ngOnInit() {
    this.wished = localStorage.getItem(this.wishId);
  }

  saveToWish() {
    let newWish: Wish = new Wish;
    newWish.imdb = this.wishId;
    newWish.user = '127.0.0.1'; // here should be token if we are using auth
    localStorage.setItem(newWish.imdb, 'true');
    this._wishService.sendWishes(newWish)
    .subscribe(
      (data: IPrimModel) => {
        // console.log(data);
      },
      err => console.error(err),
      () => console.log('wishes saved')
    );
    this.wished = 'true';
  }


}
//
