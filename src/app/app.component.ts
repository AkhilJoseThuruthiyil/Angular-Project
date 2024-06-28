import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';
import { selectAccessToken } from './store/selectors/login.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  constructor(private authenticateService: AuthService, private store: Store) {
    this.authenticateService.listenToUserAuthentication();
  }
  title = 'angular-app';

  ngOnInit(): void {
    this.store.select(selectAccessToken).subscribe(token =>
      console.log('ngRx store token', token));
  }
}
