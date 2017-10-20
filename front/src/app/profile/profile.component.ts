import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  nomeDoUsuario
  constructor(private router: Router) { }

  ngOnInit() {
    if(!tokenNotExpired()){

      localStorage.clear()
      this.router.navigate(['/expirado'])
    }
    this.nomeDoUsuario = localStorage.getItem('user')
  
    // console.log(
    //   this.jwtHelper.decodeToken(token),
    //   this.jwtHelper.getTokenExpirationDate(token),
    //   this.jwtHelper.isTokenExpired(token)
    // );
  }

}
