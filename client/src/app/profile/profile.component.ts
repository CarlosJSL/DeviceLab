import { AuthService } from './../login/auth.service'
import { Component, OnInit } from '@angular/core'
import { JwtHelper } from 'angular2-jwt'
import { Router } from '@angular/router'
import { tokenNotExpired } from 'angular2-jwt'

declare var $:any
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

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Segunda-feira'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Terça-feira'},
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Quarta-feira'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Quinta-feira'},
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Sexta-feira'}
  ];

  cards = [{
            img:'https://d33wubrfki0l68.cloudfront.net/d44bf70508a9bac20de05cfd77d44fa7b35a2092/72157/images/uploads/2017/01/jstips-header-blog.gif',
            descricao:'Repositório do projeto desenvolvido em javascript',
            },{
            img:'https://wallpaperhdzone.com/wp-content/uploads/2017/02/android-gif-wallpaper1.jpg',
            descricao:'Repositório do projeto desenvolvido em Android',
            },{
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-n4ZuRlHwhp3W-M22LlIsszqXUwelIbV4RSj8kDGB-6xr73dcjw',
            descricao:'Repositório do projeto desenvolvido em Python'
            },{
            img:'http://3.bp.blogspot.com/-4VBOmp5Qdo8/UsX4xnd9Q3I/AAAAAAAADuI/9SE54we3zGU/s1600/images.jpg',
            descricao:'Repositório do projeto desenvolvido em Delphi'  
            },{
            img:'http://blog.hackerearth.com/wp-content/uploads/2017/02/ezgif.com-optimize.gif',
            descricao:'Repositório do projeto desenvolvido em  PHP'
            },{
            img:'https://ardas-it.com/uploads/images/blogs/giph.gif',
            descricao:'Repositório do projeto desenvolvido em C'
            },{
            img:'https://media.giphy.com/media/11kEuHSQAXXiGQ/giphy.gif',
            descricao:'Repositório do projeto desenvolvido em R'
            },{
            img:'https://thumbs.gfycat.com/DirtyPlasticAndeancat-max-1mb.gif',
            descricao:'Repositório do projeto desenvolvido em Assembly'
            }];

  constructor(private router: Router,_authService: AuthService, ) {
    this.authService = _authService
   }

  ngOnInit() {
    $("#menu").sideNav();
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

  // Grafico
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;

  }
}
