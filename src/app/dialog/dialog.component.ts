import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {DetailsService} from '../service/getDetails';
import {Details} from '../model/Details';

export interface ConfirmModel {
  title: string;
  image: string;
  imdbID: string;
  year: string;
  type: string;
}

export interface IPrimModel {
  success: string;
  data: any;
}


@Component({
  selector: 'epoch-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [DetailsService]
})
export class MovieDialogComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {

  title: string;
  image: string;
  imdbID: string;
  year: string;
  type: string;
  actor: string;
  director: string;

  constructor(dialogService: DialogService, private _getDetailsService: DetailsService) {
    super(dialogService);
  }

  confirm() {
    this.close();
  }

  ngOnInit() {
    this._getDetailsService.getDetails(this.title).subscribe(
      (data: IPrimModel) => {
        if (data.success === 'true') {
          let details: Details = data.data;
          this.actor = details.actors;
          this.director = details.director;
        }
      },
      err => console.error(err),
      () => console.log('results loaded')
    );
  }

}
