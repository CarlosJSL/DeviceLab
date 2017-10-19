import {Injectable} from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppService{

    constructor(private http: Http) { }

    signUp(data){
        return this.http.post("http://localhost:3000/signup",data)
        .map(res => res.json(),
             err => err);
    }
}