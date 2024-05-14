/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JsonListService } from './json-list.service';

describe('Service: JsonList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonListService]
    });
  });

  it('should ...', inject([JsonListService], (service: JsonListService) => {
    expect(service).toBeTruthy();
  }));
});
