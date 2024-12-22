import { NgModule, CUSTOM_ELEMENTS_SCHEMA, isDevMode, Injector, ApplicationRef, createComponent } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as utils from './utils';
import { ViewContainerRef } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Store, StoreModule } from '@ngrx/store';
import * as StateConstants from '../state/state.const';
import { DotComponent } from '../libis/dot/dot.component';
import { DotInterceptor } from '../libis/dot/dot.interceptor';
import { provideHttpClient, withInterceptorsFromDi, withFetch, HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

// Define the map
export const selectorComponentMap = new Map<string, any>([
  // Add more pairs as needed
  ['nde-logo-after', DotComponent]
]);


@NgModule({
  declarations: [

  ],
  exports: [
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: StateConstants.MAX_STATE_ACTIONS_IN_HISTORY,
      logOnly: !isDevMode(),
      trace: true,
      traceLimit: StateConstants.MAX_STACK_FRAMES_IN_HISTORY
    })
  ],
  providers: [
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DotInterceptor,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Custom1ModuleModule {
  static utils = utils; // Expose the utilities for consumption
  public componentRef: any;

  public beforeSearchButton: any;

  constructor(private appRef: ApplicationRef, private viewContainerRef: ViewContainerRef, private injector: Injector, private store: Store) {
    console.log('Start constructor of Custom1ModuleModule:');

  }

  /**
   * Use componentMapping, selectorComponentMap
   * @param componentName
   */
  public getComponentRef(componentName: string) {
    let componentType = selectorComponentMap.get(componentName);
    if (componentType) {

      try {
        //return componentFactory.create(this.viewContainerRef.parentInjector);
        const injector = Injector.create({
          providers: [
            { provide: Store, useValue: this.store },
            { provide: ViewContainerRef, useValue: this.viewContainerRef },
          ],
          parent: this.viewContainerRef.injector
        });
        return createComponent(componentType, { environmentInjector: this.appRef.injector, elementInjector: injector })
      } catch (e) {
        console.error('Cannot get angular component:' + componentType, e);
        try {
          return new componentType;
        } catch (e1) {
          console.error('Cannot create angular component:' + componentType, e);
        }
      }
    }

  }


}
