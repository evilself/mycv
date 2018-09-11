import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CVListItem, CVDetails } from './cv.interface';
import { catchError, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class CVsService {
  protected apiUrl = `/api`;

  constructor(private http: HttpClient) {}

  getAll(sort: string): Observable<CVListItem[] | Object> {
    return this.http.get(`${this.apiUrl}/cv`).pipe(
      catchError(() =>
        of([
          {
            id: 1,
            dateOfBirth: '10.10.2015',
            email: 'asdasd@asdasd',
            firstName: 'ASdasd',
            lastName: 'dsadas'
          },
          {
            id: 2,
            dateOfBirth: '11.11.111',
            email: 'qweqw@asdasd.asd',
            firstName: 'sadas',
            lastName: 'sdf'
          }
        ]).pipe(delay(2000))
      )
    );
  }

  getMy() {
    return this.http.get(`${this.apiUrl}/my`).pipe(
      catchError(() =>
        of({
          id: 3,
          dateOfBirth: '11.11.111',
          firstName: 'Zdravko',
          lastName: 'Tatarski',
          email: 'zdravko.tatarski@westernacher.com'
        }).pipe(delay(2000))
      )
    );
  }

  getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  delete(cvData: CVListItem) {
    return this.http.delete(`${this.apiUrl}/${cvData.id}`);
  }
}
