import {Injectable} from '@angular/core'
import { Http } from '@angular/http'
import { JwtHelper } from 'angular2-jwt'
import { RequestOptions, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx'

@Injectable()
export class AuthService{
    
    jwtHelper: JwtHelper = new JwtHelper()
    token = localStorage.getItem('token')
    constructor(private http: Http) { 
    }

    signUp(data){
        return this.http.post("http://localhost:3000/api/signup",data)
        .map(res => res.json(),
             err => err)
    }

    signIn(data){
        return this.http.post("http://localhost:3000/api/authenticate",data)
        .map(res => {
                     this.setarLocalStorage(res)
                     return res.json()},
             err => err)
    }

    logout(id,token){
        let headers = new Headers({ 'Accept': 'application/json' })
        headers.append('Authorization',`Bearer ${token}`) 

        let options = new RequestOptions({ headers: headers })

        return this.http.post("http://localhost:3000/api/logout",id,options)
        .map(res =>  res.json(),
             err => err)
    }

    isAuthenticate(token){
        let headers = new Headers({ 'Accept': 'application/json' })
        headers.append('Authorization',`Bearer ${token}`) 

        let options = new RequestOptions({ headers: headers })

        return this.http.get("http://localhost:3000/api/isauthenticate", options)
        .map(res =>  res.json(),
             err => err)
    }
    
    setarLocalStorage(res){
        localStorage.setItem('token',res.headers.get("AUTH-TOKEN"))
        
        var token = localStorage.getItem('token')
        localStorage.setItem('id', this.jwtHelper.decodeToken(token).id)
        localStorage.setItem('user', this.jwtHelper.decodeToken(token).name)
        localStorage.setItem('email', this.jwtHelper.decodeToken(token).email)
        localStorage.setItem('lastAccess', this.jwtHelper.decodeToken(token).lastAccess)
        localStorage.setItem('creationDate', this.jwtHelper.decodeToken(token).created_at)
    }

    usuarioEstaAutenticado(){
        if(localStorage.getItem('token') == null){
            return false
        }
        return true
      }
}