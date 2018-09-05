import { async, inject, TestBed } from '@angular/core/testing';

import { MockBackend, MockConnection } from '@angular/http/testing';

import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { User, GetUsersResponse } from './users.interfaces';
import { UsersService } from './users.service';

const fakeUserData: User[] = [
  {
    id: 0,
    dateOfBirth: '1955-10-05',
    email: 'test@test.test',
    firstName: 'test',
    lastName: 'test'
  },
  {
    id: 1,
    dateOfBirth: '1955-11-05',
    email: 'tes1t@test.test',
    firstName: 'test1',
    lastName: 'test1'
  }
];

const [page, size, prop, direction] = [0, 10, 'firstName', 'desc'];

export const fakeGetAll = (): GetUsersResponse => {
  return {
    content: fakeUserData,
    first: true,
    last: false,
    number: page,
    numberOfElements: fakeUserData.length,
    size: size,
    sort: {
      ascending: false,
      direction: direction,
      ignoreCase: false,
      nullHandling: 'NATIVE',
      property: prop
    },
    totalElements: 2,
    totalPages: 1
  };
};

const HttpClientStub = {};

describe('UsersService', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [UsersService, { provide: HttpClient, useClass: HttpClientStub }, { provide: XHRBackend, useClass: MockBackend }]
      }).compileComponents();
    })
  );

  it('can instantiate service', inject([Http], (http: HttpClient) => {
    expect(http).not.toBeNull('http should be provided');
    const service = new UsersService(http);
    expect(service instanceof UsersService).toBe(true, 'new service should be ok');
  }));

  describe('getAll method', () => {
    let backend: MockBackend;
    let service: UsersService;
    let response: Response;
    let fakeRes: GetUsersResponse;

    beforeEach(
      inject([Http, XHRBackend], (http: HttpClient, be: MockBackend) => {
        backend = be;
        service = new UsersService(http);
        fakeRes = fakeGetAll();
        const options = new ResponseOptions({ status: 200, body: { data: fakeRes } });
        response = new Response(options);
      })
    );

    it('should have getAll method', async(inject([], () => {
      expect(service.getAll(page, size, `${prop},${direction}`)).toBeDefined();
    })));

    it('getAll should return an observable', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
      service.getAll(page, size, `${prop},${direction}`).subscribe((users: any) => {
        expect(users._body.data.content.length).toBe(fakeRes.content.length);
      });
    })));
  });
});
