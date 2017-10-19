import { Routes, RouterModule } from '@angular/router'
import { ProfileComponent } from "app/profile/profile.component";
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from "app/login/login.component";

const APP_ROUTES: Routes = [
    {path:'profile', component: ProfileComponent},
    {path:'login', component: LoginComponent},
    {path: '', component: LoginComponent}
]

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);