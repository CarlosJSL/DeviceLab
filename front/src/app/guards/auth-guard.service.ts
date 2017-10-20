import { AuthService } from 'app/login/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate{
  
  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot): 
              Observable<boolean> | boolean{
                return this.verificarAcesso();
  }

    private verificarAcesso(){

      if(this.authService.usuarioEstaAutenticado()){
        return true;
      }
      
      this.router.navigate(['/login'])
      return false;
    }

    canLoad(route: Route): Observable<boolean> |Promise<boolean>|boolean{

      return this.verificarAcesso();
    }
}
