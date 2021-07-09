import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Cast } from 'src/app/interface/cast';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-cast-slidesshow',
  templateUrl: './cast-slidesshow.component.html',
  styleUrls: ['./cast-slidesshow.component.css']
})
export class CastSlidesshowComponent implements OnInit {

  @Input() cast:Cast[]=[];

  constructor(
    private _servicio:PeliculasService
  ) { }

  ngOnInit(): void {

    console.log(this.cast);
  }

}
