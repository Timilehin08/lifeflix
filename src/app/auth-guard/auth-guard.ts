import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppServices } from '../services/app-services.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private appService: AppServices, private router: Router) { }
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.appService.isLoggedIn.value;
    if (user) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
