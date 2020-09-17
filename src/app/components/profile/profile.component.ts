import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { UserDetail } from 'src/app/common/userDetail';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: UserDetail;
  token: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.token = this.tokenStorageService.getToken();
  }

}