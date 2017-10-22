import { AuthService } from './../login/auth.service'
import { Component, OnInit } from '@angular/core'
import { JwtHelper } from 'angular2-jwt'
import { Router } from '@angular/router'
import { tokenNotExpired } from 'angular2-jwt'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  jwtHelper: JwtHelper = new JwtHelper()
  authService: AuthService
  nomeDoUsuario:any
  ultimoAcesso = localStorage.getItem('lastAccess')
  public loading = false

  constructor(private router: Router,_authService: AuthService, ) {
    this.authService = _authService
   }

  ngOnInit() {
    if(!tokenNotExpired()){

      localStorage.clear()
      this.router.navigate(['/expirado'])
    }
    this.nomeDoUsuario = localStorage.getItem('user')

  }
  
  verificarAutenticacao(){
    this.authService.isAuthenticate(localStorage.getItem('token'))
        .subscribe(result => { 
          console.log(result)
        },
          err => err)
  }
  logout(){
    this.loading = true
    this.authService.logout(localStorage.getItem('id'),localStorage.getItem('token'))
        .subscribe(res => {          
          localStorage.clear()
          this.router.navigate(['/login'])
          this.loading = false
        },
                   err => err)
  }
}
