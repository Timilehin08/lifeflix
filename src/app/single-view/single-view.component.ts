import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UUID4 } from 'uuid/v4';
import { IMovie } from './../interfaces/movie-data-interface';
import { AppServices } from '../services/app-services.service';
import { BaseComponent } from '../base-component/base-component';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent extends BaseComponent implements OnInit, OnDestroy {

  movie: IMovie;
  favorite: boolean;
  isLoggedIn: boolean;

  constructor(
    private appService: AppServices,
    private router: ActivatedRoute
    ) {
      super();
    }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.addSubscription(
      this.getSingleMovie()
    );
    this.isLogin();
  }


  getSingleMovie() {
    this.router.params.subscribe(({ id }) => {
      this.appService.getSingleMovie(id).subscribe(movie => {
        this.movie = movie;
        this.checkFavorites(id);
      });
    });
  }

  isLogin() {
    this.appService.getLoginStatus().subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  checkFavorites(id: UUID4) {
    this.appService.getFavorites().subscribe(value => {
      this.favorite = value.find(favID => favID === id);
    })
  }

  favoriteMovie(id: UUID4) {
    this.appService.setFavorites(id);
  }

  removeFavoriteMovie (id: UUID4) {
    this.appService.removeFavorites(id);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

}
