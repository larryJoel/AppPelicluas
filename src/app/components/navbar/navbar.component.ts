import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  buscarPelicula(texto:string){
    texto.trim(); //borrar los espacios adelante y atras del texto
    if(texto){
      console.log(texto);
    }
    this.router.navigate(['/buscar', texto]);
  }

}
