import { TestBed } from '@angular/core/testing';

import { ConnectioncontrollerService } from './connectioncontroller.service';

describe('ConnectioncontrollerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectioncontrollerService = TestBed.get(ConnectioncontrollerService);
    expect(service).toBeTruthy();
  });
});
