import { Categoria } from './categoria';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private httpClient: HttpClient = inject(HttpClient);

  private url: string = 'http://localhost:3000';

  public get(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${this.url}/categorias`);
  }

  public save(categoria: Categoria): Observable<Categoria> {
    return this.httpClient.post<Categoria>(`${this.url}/categorias`, categoria);
  }
}