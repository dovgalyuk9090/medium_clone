import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app-routes';
import { provideRouter } from '@angular/router';

// next code will be load our routes and the routes file will be lazyload our links
bootstrapApplication(AppComponent, { providers: [provideRouter(appRoutes)] });
