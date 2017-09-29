import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { GridComponent } from './app/grid/grid.component';
import { environment } from './environments/environment';

// if (environment.production) {
  enableProdMode();
// }

platformBrowserDynamic().bootstrapModule(AppModule)
  //.catch(err => console.log(err));
  .catch(err => {});
