import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class AuthService{
    
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: Http) { 
    }

    signUp(data){
        return this.http.post("http://localhost:3000/signup",data)
        .map(res => res.json(),
             err => err);
    }

    signIn(data){
        return this.http.post("http://localhost:3000/authenticate",data)
        .map(res => {
                     localStorage.setItem('token',res.headers.get("AUTH-TOKEN"))

                     var token = localStorage.getItem('token');
                     
                     localStorage.setItem('user',this.jwtHelper.decodeToken(token).name)
                     localStorage.setItem('email',this.jwtHelper.decodeToken(token).email)
                     return res.json()},
             err => err);
    }

    usuarioEstaAutenticado(){
        if(localStorage.getItem('token') == null){
            return false;
        }
        return true
      }
}