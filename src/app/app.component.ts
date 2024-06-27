import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { onAuthStateChanged } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(private authenticateService: AuthService) {
    this.authenticateService.listenToUserAuthentication();
  }
  title = 'angular-app';

  ngOnInit(): void {
  }
}
