import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { UserDetail } from 'src/app/common/userDetail';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  user: UserDetail = new UserDetail();
  isLoggedIn = false;
  username: string;

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.username = this.user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  constructor(private tokenStorageService: TokenStorageService) { }


}