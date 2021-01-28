import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IMovie } from 'src/app/interfaces/movie-data-interface';
import { AppServices } from 'src/app/services/app-services.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  @ViewChild("slide", { static : true }) slide: ElementRef;
  @ViewChild("image", { static : true }) image: ElementRef;
  counter = 1;
  imageWidth: number;
  movies: IMovie[];
  searchedMovies: IMovie[];
  images: any;

  constructor(private appService: AppServices) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.imageWidth = this.image.nativeElement.clientWidth;
    this.slide.nativeElement.style.transform = `translateX(${(-this.counter * this.imageWidth)}px)`;
    window.onresize = () => {
      this.imageWidth = this.image.nativeElement.clientWidth;
    };
    this.startCarousel();
    this.appService.getAllMovies().subscribe(
      movieArray => { this.movies = movieArray; }
    );
    this.searchMovie();
    this.images = document.querySelectorAll('.slide img');
    this.triggerTransitionEndListener();
  }

  triggerTransitionEndListener() {
    this.slide.nativeElement.addEventListener('transitionend', () => {
      const val = this.images[this.counter];
      if (val && val.id === 'lastClone') {
        this.slide.nativeElement.style.transition = 'none';
        this.counter = this.images.length - 2;
        this.slide.nativeElement.style.transform = `translateX(${(-this.counter * this.imageWidth)}px)`;
      } else if (val && val.id === 'firstClone') {
        this.slide.nativeElement.style.transition = 'none';
        this.counter = this.images.length - this.counter;
        this.slide.nativeElement.style.transform = `translateX(${(-this.counter * this.imageWidth)}px)`;
      }
    })
  }

  searchMovie() {
    this.appService.searchedMovies.subscribe(data => {
      this.searchedMovies = (data && data.length) ? data : null;
    })
  }

  startCarousel() {
    setInterval( () => this.nextBtn(), 6000);
  }

  nextBtn() {
    if (this.counter >= 15) return;
    this.slide.nativeElement.style.transition = 'transform 0.4s ease-in-out';
    this.counter += 1;
    this.slide.nativeElement.style.transform = `translateX(${(-this.counter * this.imageWidth)}px)`;
  }

  prevBtn() {
    if (this.counter <= 0) return;
    this.slide.nativeElement.style.transition = 'transform 0.4s ease-in-out';
    this.counter -= 1;
    this.slide.nativeElement.style.transform = `translateX(${(-this.counter * this.imageWidth)}px)`;
  }


  scrollDown() {
    window.scrollTo({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    })
  }

}
