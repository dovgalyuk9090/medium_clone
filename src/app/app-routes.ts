import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'register',
    // we want to lazyload the route below
    loadChildren: () => import('src/app/auth/auth.routes').then((m) => m.registerRoutes),
  },
];
