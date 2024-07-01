import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideState, provideStore } from '@ngrx/store';
import { loginReducer } from './store/reducers/login.reducer';
import { provideEffects } from '@ngrx/effects';
import { LoginEffects } from './store/effects/login.effects';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(HttpClientModule),
  provideRouter(routes),
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideAuth(() => getAuth()),
  provideStore(), provideState({ name: 'login', reducer: loginReducer }),
  provideHttpClient(), provideEffects(LoginEffects),
  provideClientHydration()]
};
