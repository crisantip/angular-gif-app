import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'   // Establece como global
})
export class GifsService {

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  constructor(private http: HttpClient) {
    // Recupera del localstorage
    // ! "Confía en mi yo se lo que estoy haciendo". Omite error de TS
    // Cuando no existe historial, devuelve un arreglo vacio
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  get historial() {
    return [...this._historial];
  }
  
  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if( !this._historial.includes(query) ) { // Verifica que no exista el elemento
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10); // Limita a 10 elementos
      localStorage.setItem('historial', JSON.stringify(this._historial)); // Guarda en el localstorage
    }
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=8wSUl385kgmjKY51zyMhJWZi8rApIg34&q=${query}&limit=10`)
      .subscribe( response => {
        console.log( response.data );
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
  }
}
