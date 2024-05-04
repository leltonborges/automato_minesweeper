import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { mainRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { minefieldRoutes } from './components/minefield/minefield.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideRouter([...mainRoutes, ...minefieldRoutes]),
    provideRouter(mainRoutes),
    provideClientHydration(),
    provideAnimationsAsync()
  ]
};
