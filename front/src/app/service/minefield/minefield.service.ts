import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Board } from '../../core/interface/minefield/board';
import { BehaviorSubject, Observable } from 'rxjs';
import { Config } from '../../core/interface/minefield/config';

@Injectable({
              providedIn: 'root'
            })
export class MinefieldService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDefaultBoard(): Observable<String> {
    console.log(`api: ${ this.apiUrl }`);
    this.http.get<Board>(`${ this.apiUrl }/minesweeper/start/default`)
        .subscribe({ next: body => console.log(body) });
    return new BehaviorSubject('');
  }

  getRandomBoard(config: Config): Observable<Board> {
    return this.http.post<Board>(`${ this.apiUrl }/minesweeper/start/random/`, config);
  }

  resetBoard(): Observable<void> {
    return this.http.get<void>(`${ this.apiUrl }/minesweeper/reset/grid`);
  }
}
