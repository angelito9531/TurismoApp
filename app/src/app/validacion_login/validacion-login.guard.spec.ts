import { TestBed, async, inject } from '@angular/core/testing';

import { ValidacionLoginGuard } from './validacion-login.guard';

describe('ValidacionLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidacionLoginGuard]
    });
  });

  it('should ...', inject([ValidacionLoginGuard], (guard: ValidacionLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
