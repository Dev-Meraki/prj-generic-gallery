import { TestBed,inject } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { DatastoreService } from './datastore.service';

import { environment } from 'src/environments/environment';

interface Data{
  id: number,
  title:string,
  instock : number
}

describe('DatastoreService', () => {
  let service: DatastoreService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DatastoreService]
    });
    service = TestBed.inject(DatastoreService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should return the library books  from the backend', () => {
    const testData: Data = {id:64178,title:"Captain America (2018) #25",instock:6};
    let result:any;
    service.getBooksFromRemoteLibrary().subscribe(data => {
     result = data;
     expect(result).toEqual(testData);
    });
    const req = http.match(environment.API_URL);
    //expect(req.request.method).toEqual('GET');

    req[0].flush(testData);
    http.verify();

  });

  it('can test for 404 error', () => {
    const emsg = 'deliberate 404 error';

    service.getBooksFromRemoteLibrary().subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const req = http.match(environment.API_URL);

    // Respond with mock error
    req[0].flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
