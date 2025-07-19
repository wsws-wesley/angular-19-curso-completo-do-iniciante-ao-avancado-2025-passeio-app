import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Local } from './local';

@Injectable({
  providedIn: 'root'
})
export class LocaisService {
  private httpClient: HttpClient = inject(HttpClient);

  private url: string = 'http://localhost:3000';

  public get(): Observable<Local[]> {
    return this.httpClient.get<Local[]>(`${this.url}/locais`);
  }

  public getById(id: string): Observable<Local> {
    return this.httpClient.get<Local>(`${this.url}/locais/${id}`);
  }

  public getByNameAndCategory(name: string, category: string): Observable<Local[]> {
    let params = new HttpParams();
    if (name) params = params.set('name_like', name);
    if (category) params = params.set('category', category);

    return this.httpClient.get<Local[]>(`${this.url}/locais`, { params });
  }

  public save(local: Local): Observable<Local> {
    if (local.id) {
      return this.httpClient.put<Local>(`${this.url}/locais/${local.id}`, local);
    } else {
      return this.httpClient.post<Local>(`${this.url}/locais`, local);
    }
  }
}