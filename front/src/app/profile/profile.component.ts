import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  
  constructor(private router: Router) { }

  ngOnInit() {
    if(this.jwtHelper.isTokenExpired(localStorage.getItem('token'))){

      localStorage.clear()
      this.router.navigate(['/login'])
    }
    // console.log(
    //   this.jwtHelper.decodeToken(token),
    //   this.jwtHelper.getTokenExpirationDate(token),
    //   this.jwtHelper.isTokenExpired(token)
    // );
  }

}
