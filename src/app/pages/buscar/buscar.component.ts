import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { string } from 'joi';
import { Movie } from 'src/app/interface/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  data:any[]=[];
  buscador = string;
  constructor(
    private activardRouter:ActivatedRoute,
    private _servicio:PeliculasService,
    private router:Router
    ) { }

  ngOnInit(): void {

    this.activardRouter.params.subscribe(params=>{
      //console.log(params.texto);
      this.buscador=params.texto;
      this._servicio.buscarPelucas(params.texto)
      .subscribe(
        res=>{ 
          this.data = res;
          //console.log(res)
        },
        error=>{ console.error(error) }
      )
      
    })
  }

  mostrarPelicula(movie:Movie){
    this.router.navigate(['/pelicula', movie.id])
  }
  

}
