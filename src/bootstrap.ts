import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Custom1ModuleModule } from './app/custom1-module/custom1-module.module';

platformBrowserDynamic().bootstrapModule(Custom1ModuleModule)
  .catch(err => console.error(err));
