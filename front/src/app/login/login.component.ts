import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from "app/login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'app works!';
  signup= false;
  formularioLogin: FormGroup;
  formularioCadastro : FormGroup;
  loginService: LoginService;

  constructor(private formBuilder: FormBuilder, 
              _loginService: LoginService, 
              private toastr: ToastrService) {
    this.loginService = _loginService;
  }

  onSubmitLogin(){
    let data = {
      ...this.formularioLogin.value
    }

    this.loginService.signIn(data)
        .subscribe(result => this.toastr.success('Sucesso!'),
                    err => err)

  }

  onSubmitCadastro(){
    let data = {
      ...this.formularioCadastro.value
    }

    this.loginService.signUp(data)
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
