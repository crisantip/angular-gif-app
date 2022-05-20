import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'   // Establece como global
})
export class GifsService {

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  constructor(private http: HttpClient) {}

  get historial() {
    return [...this._historial];
  }
  
  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if( !this._historial.includes(query) ) { // Verifica que no exista el elemento
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10); // Limita a 10 elementos
    }
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=8wSUl385kgmjKY51zyMhJWZi8rApIg34&q=${query}&limit=10`)
      .subscribe( response => {
        console.log( response.data );
        this.resultados = response.data;
    });
  }
}
