import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {AppService} from './app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'app works!';
  signup= false;
  formularioLogin: FormGroup;
  formularioCadastro : FormGroup;
  appService: AppService;

  constructor(private formBuilder: FormBuilder, 
              _appService: AppService, 
              private toastr: ToastrService) {
    this.appService = _appService;
  }

  onSubmitLogin(){
    console.log(this.formularioLogin);
  }

  onSubmitCadastro(){
    let data = {
      ...this.formularioCadastro.value
    }

    this.appService.signUp(data)
    .subscribe(result => {  this.toastr.success('Cadastrado!',result); 
                          this.signup= false },
               err => this.toastr.error(this.formaString(err)));
  }

  formaString(text){
    return JSON.parse(text._body).error.substring(JSON.parse(text._body)
                .error.indexOf("Validation Error: ") + 
                "Validation Error: ".length);
  }

  ngOnInit() {
    this.formularioLogin = this.formBuilder.group({
        email: [null],
        password: [null]
    });

    this.formularioCadastro = this.formBuilder.group({
      name: [null],
      email: [null],
      password: [null]
    });
  }
}
