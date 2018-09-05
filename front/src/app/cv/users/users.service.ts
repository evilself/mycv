import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, GetUsersResponse } from './users.interfaces';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UsersService {
  protected apiUrl = ``;

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number, sort: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}?page=${page}&size=${size}&sort=${sort}`)
      .pipe(
        catchError(() =>
          of({
            content: [
              {
                dateOfBirth: '10.10.2015',
                email: 'asdasd@asdasd',
                firstName: 'ASdasd',
                lastName: 'dsadas'
              },
              {
                dateOfBirth: '11.11.111',
                email: 'qweqw@asdasd.asd',
                firstName: 'sadas',
                lastName: 'sdf'
              }
            ]
          })
        )
      );
    // .map((response: GetUsersResponse) => response);
  }

  getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addUser(userData: User) {
    return this.http.post(this.apiUrl, userData);
    // .map((res: User) => Object.assign(res, { opType: 'Added' }));
  }

  updateUser(userData: User) {
    return this.http.put(this.apiUrl, userData);
    // .map((res: User) => Object.assign(res, { opType: 'Updated' }));
  }

  deleteUser(userData: User) {
    return this.http.delete(`${this.apiUrl}/${userData.id}`);
  }
}
