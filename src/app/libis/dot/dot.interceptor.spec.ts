import { TestBed } from '@angular/core/testing';

import { DotInterceptor } from './dot.interceptor';

describe('DotInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DotInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: DotInterceptor = TestBed.inject(DotInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
