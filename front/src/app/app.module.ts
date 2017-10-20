import { AuthService } from './login/auth.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing'
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from "app/app.component";
import { SessaoExpiradaComponent } from './sessao-expirada/sessao-expirada.component';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    SessaoExpiradaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    routing,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rectangleBounce,
      backdropBackgroundColour: 'black', 
      backdropBorderRadius: '4px',
      fullScreenBackdrop:true
  })
    
  ],
  providers: [AuthService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
