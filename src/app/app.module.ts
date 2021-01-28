import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { HeroComponent } from 'src/app/hero/hero.component';
import { TopNavComponent } from 'src/app/top-nav/top-nav.component';
import { MovieCardComponent } from 'src/app/movie-card/movie-card.component';
import { SingleViewComponent } from 'src/app/single-view/single-view.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';
import { VideoFrameComponent } from 'src/app/video-frame/video-frame.component';
import { FavoritesComponent } from 'src/app/favorites/favorites.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    VideoFrameComponent,
    TopNavComponent,
    SingleViewComponent,
    HeroComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
