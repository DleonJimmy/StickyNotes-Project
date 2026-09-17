import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyDRUAzzg8Tf3FYwkv8u_Ilh2DgA2uRLTRI',
        authDomain: 'kobeproject-c938c.firebaseapp.com',
        projectId: 'kobeproject-c938c',
        storageBucket: 'kobeproject-c938c.firebasestorage.app',
        messagingSenderId: '361285456393',
        appId: '1:361285456393:web:ca09cbe81dad72f0009ed8',
      }),
    ),
    provideFirestore(() => getFirestore()),
  ],
};
