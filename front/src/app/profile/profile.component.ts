import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  jwtHelper: JwtHelper = new JwtHelper();
  constructor() { }

  ngOnInit() {
    var token = localStorage.getItem('token');
    console.log(
      this.jwtHelper.decodeToken(token),
      this.jwtHelper.getTokenExpirationDate(token),
      this.jwtHelper.isTokenExpired(token)
    );
  }

}
