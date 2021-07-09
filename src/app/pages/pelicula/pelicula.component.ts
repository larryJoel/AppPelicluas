
import { Component, OnInit,Input,AfterViewInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/interface/cartelera-response';
import { MovieResoult } from 'src/app/interface/MovieResoult';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Location } from "@angular/common";
import { Cast } from 'src/app/interface/cast';
import { Swiper } from 'swiper';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit, AfterViewInit {
  //data:any[]=[];
 // @Input()movies:Movie[] =[];
 public pelicula:any=[];
 public cast:any=[]; 
  constructor( 
    private _routes: ActivatedRoute,
    private peliculasService:PeliculasService,
    private location:Location,
    private router:Router
    ) { }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      const swiper = new Swiper(".swiper-container", {
        slidesPerView:6,
        freeMode:true,
        spaceBetween:15
      })
    },500 )
  }

  ngOnInit(): void {
    const {id} = this._routes.snapshot.params;

   
    this.peliculasService.getPeliculasDetalle(id)
    .subscribe(
      res =>{
        this.pelicula=res
       },
      error => { 
      this.router.navigateByUrl('/home'),
       console.log(error); }
    )

    this.peliculasService.getCast(id)
    .subscribe(
      res =>{
        this.cast = res.filter(actor =>actor.profile_path != null);
      },
      error =>{
        
        this.router.navigateByUrl('/home'),
        console.log(error);}
    );
  }
 
  regresar(){
    this.location.back();
  }
}

