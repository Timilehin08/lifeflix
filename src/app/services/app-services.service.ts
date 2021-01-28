import { Injectable } from '@angular/core';
import { UUID4 } from 'uuid/v4';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { IMovie } from './../interfaces/movie-data-interface';
import mockdata from '../mock-data';

@Injectable({
  providedIn: 'root'
})
export class AppServices {

  allMovies: BehaviorSubject<IMovie[]>;
  searchedMovies: BehaviorSubject<IMovie[]>;
  isLoggedIn: BehaviorSubject<boolean>;
  favorites: BehaviorSubject<UUID4[]>;
  user: BehaviorSubject<{}>;

  constructor() {
    this.isLoggedIn = new BehaviorSubject(Boolean(sessionStorage.getItem('isLoggedIn')) || false);

    this.allMovies = new BehaviorSubject(mockdata);
    this.searchedMovies = new BehaviorSubject(null);

    const favorites = Boolean(sessionStorage.getItem('favorites')) ? sessionStorage.getItem('favorites') : JSON.stringify([]);
    sessionStorage.setItem('favorites', favorites);
    this.favorites = new BehaviorSubject(JSON.parse(favorites));
    this.user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));
   }

  getAllMovies(): Observable<IMovie[]> {
    return of(mockdata);
  }

  getSingleMovie(id: UUID4): Observable<IMovie> {
    const result = this.allMovies.value.find(movie => movie.id === id);

    return of(result);
  }

  searchMovie(query: string): Observable<IMovie[]> {
    const result = this.allMovies.value
    .filter(movie => movie.Title.toLowerCase()
    .includes(String(query).toLowerCase()));

    return of(result);
  }

  changeLoginStatus(value: boolean): void  {
    this.isLoggedIn.next(value);
  }

  getLoginStatus(): Observable<boolean> {
    return this.isLoggedIn
  }

  getFavorites(): Observable<UUID4[]> {
    return this.favorites;
  }

  setFavorites(id: UUID4): void  {
    const fav = JSON.parse(sessionStorage.getItem('favorites')).concat(id);
    const newFavorites = JSON.stringify(fav);
    sessionStorage.setItem('favorites', newFavorites);
    this.favorites.next(fav);
  }

  removeFavorites(id: UUID4): void  {
    const fav = JSON.parse(sessionStorage.getItem('favorites')).filter(favID => favID !== id);
    const newFavorites = JSON.stringify(fav);
    sessionStorage.setItem('favorites', newFavorites);
    this.favorites.next(fav);
  }

  registerUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('isLoggedIn', JSON.stringify(user));
    this.isLoggedIn.next(true);
    this.user.next(user);
  }

  loginUser(userDetails) {
    const user = JSON.parse(localStorage.getItem('user'));
    let value = false;
    if (user && user.password === userDetails.password
      && user.email === userDetails.email) {
      sessionStorage.setItem('isLoggedIn', JSON.stringify(user));
      this.isLoggedIn.next(true);
      this.user.next(user);
      value = true;
    }
      return value;
  }

  logout() {
    sessionStorage.removeItem('isLoggedIn');
    this.isLoggedIn.next(false);
    this.user.next(null);
  }

}
