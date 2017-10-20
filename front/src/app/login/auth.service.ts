import {Injectable} from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class AuthService{
    
    private usuarioAutenticado: boolean = false ;
    
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