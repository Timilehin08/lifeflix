import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { SingleViewComponent } from './single-view/single-view.component';
import { LoginComponent } from './login/login.component';
import { HeroComponent } from './hero/hero.component';
import { RegisterComponent } from './register/register.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AuthGuard } from './auth-guard/auth-guard';


const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'single-view/:id', component: SingleViewComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
