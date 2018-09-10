import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CVListItem, CVDetails } from './cv.interface';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CVsService {
  protected apiUrl = ``;

  constructor(private http: HttpClient) { }

  getAll(page: number, size: number, sort: string): Observable<CVListItem[] | Object> {
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
  }

  getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  delete(cvData: CVListItem) {
    return this.http.delete(`${this.apiUrl}/${cvData.id}`);
  }
}
