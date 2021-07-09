import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import {Movie} from '../../interface/cartelera-response'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public movies:Movie[]=[];
  public moviesSlideshow:Movie[]=[];
  peliculasService: any;

  @HostListener('window:scroll', ['$event'])
  onScrill(){
    const pos = (document.documentElement.scrollTop || document.body.scrollTop)+1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if(pos>max){
      
        this._servicio.getCartelera().subscribe(resp =>{
            this.movies.push(...resp.results);
        })

      
     
    }
  }

  constructor( private _servicio:PeliculasService) { }

  ngOnInit(): void {
    this._servicio.getCartelera()
    .subscribe(
      res =>{this.movies= res.results
             this.moviesSlideshow = res.results;
      },
      error =>{console.log(error);}
    )
  }

  OnDestroy(){
    this._servicio.resetCarteleraPage()
  }

}
