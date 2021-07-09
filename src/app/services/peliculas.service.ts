import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { off } from 'process';
import { of } from 'rxjs';
//import { off } from 'process';
import { pipe} from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, tap } from "rxjs/operators";
import { CarteleraResponse, Movie } from '../interface/cartelera-response';
import { Cast } from '../interface/cast';
import { MovieResoult } from '../interface/MovieResoult';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  baseUrl:string = 'https://api.themoviedb.org/3';
  carteleraPage:number = 1;
  public cargando: boolean = false;

  url: string= `/movie/now_playing`;
  
  constructor(
    private http:HttpClient
  ) { }

  get params(){
    return{
      api_key:'37e586d8989c20dc635a472d0b93c63c',
      language:'en-US',
      page:this.carteleraPage
    }
  }
    getCartelera():Observable<CarteleraResponse>{

    
     return this.http.get<CarteleraResponse>(`${this.baseUrl}${this.url}`,{
      params:this.params}).pipe(
        tap(()=>{
          this.carteleraPage += 1;
     
        })
      );
    }
    //https://api.themoviedb.org/3https://api.themoviedb.org/3/search/movie
    buscarPelucas(texto:string):Observable<Movie[]>{
    
      const params ={...this.params, page:'1', query:texto}

     return  this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{
        params
      }).pipe(
        map(res=>res.results)
      )
    }

    resetCarteleraPage(){
      this.carteleraPage = 1;
    }

    getPeliculasDetalle(id:string){
      return this.http.get<MovieResoult>(`${this.baseUrl}/movie/${id}`,{
        params: this.params
      }).pipe(
        catchError(error=> of(null))
      )
    }

    getCast(id:string){
      return this.http.get<Cast>(`${this.baseUrl}/movie/${id}/credits`,{
        params: this.params
      }).pipe(
        map(res=>res.cast))
    }

}
