import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { loginFailure, loginSuccess } from '../actions/login.actions';

@Injectable()
export class LoginEffects {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType('[Login] User Login'),
            switchMap(({ email, password }) =>
                this.authService.onLogin(email, password).pipe(
                    map((response: any) => loginSuccess({
                        accessToken: response.user.accessToken,
                        email: response._tokenResponse.email,
                        userName: response._tokenResponse.displayName
                    })),
                    catchError(error => of(loginFailure({ error })))
                )
            )
        )
    );

    constructor(private actions$: Actions, private authService: AuthService) { }
}