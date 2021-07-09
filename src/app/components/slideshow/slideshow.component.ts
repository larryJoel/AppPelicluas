import { AfterContentInit,AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interface/cartelera-response';
import { Swiper } from "swiper";
//import { runInThisContext } from 'vm';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  data:any[]=[];
  @Input()movies:Movie[] =[];
  public swiper:any;
  constructor() { }

  ngAfterViewInit(){
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
    });
  }

  ngOnInit(): void {
    //console.log(this.movies);
    this.data=this.movies
  }
  
  onSlidenext(){
  this.swiper.slideNext();
  }
  
  onSlidePrev(){

  this.swiper.slidePrev();
  }

}
