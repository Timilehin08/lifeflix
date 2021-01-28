import { Component, OnInit } from '@angular/core';
import { IMovie } from './../interfaces/movie-data-interface';
import { AppServices } from '../services/app-services.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favMovies: IMovie[];
  movies: IMovie[];
  searched: IMovie[] = [];

  constructor(private appService: AppServices) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getAllMovies();
    this.filterFavorites();
    this.search();
  }

  filterFavorites(): void {
    this.appService.getFavorites().subscribe(data => {
      const filtered = [];
      data.forEach(id => {
        const movie = this.movies.find(movie => movie.id === id);
        if (movie) {
          filtered.push(movie);
        }
      });
      this.favMovies = filtered;
    })
  }

  getAllMovies(): void {
    this.appService.getAllMovies().subscribe(
      movieArray => { this.movies = movieArray; }
    );
  }

  search() {
    this.appService.searchedMovies.subscribe(value => {
      const filtered = [];
      value = value || [];
      this.favMovies.forEach(data => {
        const movie = value.find(d => d.id === data.id);
        if(movie) {
          filtered.push(movie);
        }
      });
      this.searched = filtered;
    })
  }

}
