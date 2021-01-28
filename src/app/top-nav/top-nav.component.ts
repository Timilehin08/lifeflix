import { Component, OnInit } from '@angular/core';
import { AppServices } from '../services/app-services.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  logo = 'https://res.cloudinary.com/shaolinmkz/image/upload/v1571084574/ALC/google-ship/movie-basket.png';

  isLogin:boolean;
  user:any;
  isMobile: boolean;
  menuOpen = false;

  constructor(private appService: AppServices) { }

  ngOnInit() {
    this.getLoginStatus();
    this.resizeContition();
    this.initResize();
    this.showSearch();
  }

  resizeContition() {
    if (window.innerWidth <= 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  initResize() {
    window.addEventListener('resize', () => {
      this.resizeContition();
    })
  }

  showSearch() {
    const pathname = window.location.pathname;

    if (pathname.includes('/favorites') || pathname === '/') {
      return true;
    } else {
      return false;
    }
  }

  closeMenu(event) {
    if (event.target.className.includes('searchy')) {
      return;
    }
    this.menuOpen = !this.menuOpen
  }

  getLoginStatus() {
    this.appService.getLoginStatus().subscribe(value => {
      this.isLogin = value;
      this.user = JSON.parse(localStorage.getItem('user'));
    });
  }


  handleSearch(query) {
    this.appService.searchMovie(query).subscribe(data => {
      this.appService.searchedMovies.next(data);
      window.scrollTo({
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth'
      })
    })
  }

  logOut() {
    this.appService.logout();
  }
}
