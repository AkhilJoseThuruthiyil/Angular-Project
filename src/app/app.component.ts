import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { selectAccessToken } from './store/selectors/login.selectors';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  constructor(private store: Store, private actions$: Actions) {
  }
  title = 'angular-app';

  ngOnInit(): void {
    this.actions$.subscribe(res => {
      console.log(res)
    })
    this.store.select(selectAccessToken).subscribe(token =>
      console.log('ngRx store token', token));
  }
}
