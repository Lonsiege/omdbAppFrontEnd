import {Component, Input, OnDestroy, OnInit, Renderer} from '@angular/core';
import {Movie} from '../model/MovieSimple';
import {DialogService} from 'ng2-bootstrap-modal';
import {MovieDialogComponent} from '../dialog/dialog.component';
import {Subscription} from 'rxjs/Subscription';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'epoch-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnDestroy {

  dialog: Subscription;

  constructor(private dialogService: DialogService, private render: Renderer,
              private http: HttpClient) {}

  @Input() cinema;

  openDialog(cinema) {
    this.render.setElementStyle(document.body, 'overflow', 'hidden');
    this.dialog = this.dialogService.addDialog(MovieDialogComponent, {
      title: cinema.Title,
      image: cinema.Poster,
      imdbID: cinema.imdbID,
      year: cinema.Year,
      type: this.cinema.Type
    }).subscribe(() => {
        this.render.setElementStyle(document.body, 'overflow', 'auto');
      });
  }

  ngOnDestroy() {
    // this.dialog.unsubscribe();

    // Finite Observable —
     // When you have a finite sequence,
      // usually you don’t need to unsubscribe, for example when using the HTTP service or the timer observable.
    // https://netbasal.com/when-to-unsubscribe-in-angular-d61c6b21bad3
  }


}


