import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {AppService} from './app.service';

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

  constructor(private formBuilder: FormBuilder, _appService: AppService) {
    this.appService = _appService;
  }

  onSubmitLogin(){
    console.log(this.formularioLogin);
  }

  onSubmitCadastro(){
    console.log(this.formularioCadastro)
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
