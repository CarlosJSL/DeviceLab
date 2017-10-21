import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'app works!';
  formularioLogin: FormGroup;
  formularioCadastro : FormGroup;
  authService: AuthService;
  signup = false;
  public loading = false;

  constructor(private formBuilder: FormBuilder, 
              _authService: AuthService, 
              private toastr: ToastrService,
              private router: Router) {
    this.authService = _authService;
  }

  onSubmitLogin(){
    console.log()
    if(this.formularioLogin.valid){
        this.loading = true
        let data = {
          ...this.formularioLogin.value
        }

        this.authService.signIn(data)
            .subscribe(result => { 
                        this.router.navigate(['/profile'])
                        this.loading = false
                      },
                        err => {
                          
                          this.loading = false
                          this.toastr.error(err._body)
                      })
    }else{
      this.loading = false
      this.toastr.error('O email está em um formato inválido','Inválido')
    }
  }

  onSubmitCadastro(){
    this.loading = true;

    if(this.formularioCadastro.valid){
        let data = {
          ...this.formularioCadastro.value
        }

        this.authService.signUp(data)
            .subscribe(result => {
                        this.toastr.success('Cadastrado!',result) 
                        this.signup = false
                        this.loading = false
                      },
                      err => {

                        this.toastr.error(err._body) 
                      });
    }else{
        this.loading = false
        this.toastr.error('O email está em um formato inválido','Inválido')
    }

  }

 
  ngOnInit() {

    this.formularioLogin = this.formBuilder.group({
        email: [null,[<any>Validators.required,<any>Validators.email]],
        password: [null]
    });

    this.formularioCadastro = this.formBuilder.group({
      name: [null],
      email: [null,[<any>Validators.required,<any>Validators.email]],
      password: [null]
    });
  }
}
