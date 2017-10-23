import { SessaoExpiradaComponent } from './sessao-expirada/sessao-expirada.component'
import { Routes, RouterModule } from '@angular/router'
import { ProfileComponent } from "app/profile/profile.component"
import { ModuleWithProviders } from "@angular/core"
import { LoginComponent } from "app/login/login.component"
import { AuthGuardService } from './guards/auth-guard.service'

const APP_ROUTES: Routes = [
    {path:'profile', component: ProfileComponent,
     canActivate: [AuthGuardService],
     canLoad: [AuthGuardService]},
    {path:'login', component: LoginComponent},
    {path:'expirado', component: SessaoExpiradaComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
]

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES)