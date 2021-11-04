import { TestBed } from '@angular/core/testing';

import { MyBooksStoreService } from './my-books-store.service';
import { SnackBarService } from 'src/app/core/utility-service/snack-bar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('MyBooksStoreService', () => {
  let service: MyBooksStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, HttpClientTestingModule],
      providers: [SnackBarService, MyBooksStoreService],
    });
    service = TestBed.inject(MyBooksStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
