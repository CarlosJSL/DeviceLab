import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from "app/app.component";
import { ProfileComponent } from "app/profile/profile.component";
import { ModuleWithProviders } from "@angular/core";

const APP_ROUTES: Routes = [
    {path:'profile', component: ProfileComponent},
    {path:'login', component: AppComponent},
    {path: '', component: AppComponent}
]

const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);