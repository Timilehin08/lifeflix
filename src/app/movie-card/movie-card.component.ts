import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UUID4 } from 'uuid/v4';
import { IMovie } from './../interfaces/movie-data-interface';
import { AppServices } from '../services/app-services.service';
import { BaseComponent } from '../base-component/base-component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent extends BaseComponent implements OnDestroy, OnInit {

  @Input() movies: IMovie[];
  status: boolean;
  isLoggedIn: boolean;

  constructor(
    private appService: AppServices,
  ) {
    super();
  }

  ngOnInit () {
    this.isLogin();
  }

  checkFavoriteStatus(id: UUID4) {
    return this.movies.find(movie => movie.id = id) ? true : false;
  }

  checkFavorites(id: UUID4): IMovie {
    const val = [];
    this.addSubscription(
      this.appService.getFavorites().subscribe(value => {
        val.push(value.find(favID => favID === id));
      })
    );
    return val[0];
  }

  isLogin() {
    this.appService.getLoginStatus().subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  favoriteMovie(id: UUID4) {
    this.appService.setFavorites(id);
  }

  removeFavoriteMovie(id: UUID4) {
    this.appService.removeFavorites(id);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
