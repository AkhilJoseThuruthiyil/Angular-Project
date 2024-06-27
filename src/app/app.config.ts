import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(HttpClientModule),
  provideRouter(routes),
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideAuth(() => getAuth()),
  provideStore(),
  provideHttpClient(),
  provideClientHydration()]
};
