import { LoginService } from 'app/login/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate{
  
  constructor(private loginService: LoginService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot): 
              Observable<boolean> | boolean{
      
                return this.verificarAcesso();
  }

    private verificarAcesso(){
      if(this.loginService.usuarioEstaAutenticado()){
        return true;
      }
      this.router.navigate(['/login'])
      return false;
    }

    canLoad(route: Route): Observable<boolean> |Promise<boolean>|boolean{

      return this.verificarAcesso();
    }
}
