import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdInputModule, MdCardModule, MdGridListModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './footer/footer.component';
import {GameComponent} from './game/game.component';
import {routing} from './app.routing';
import {UserManagementService} from './services/user-management.service';
import {ApiService} from './services/api.service';
import {SocketService} from "./services/socket.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    routing,
    MdCardModule,
    MdButtonModule,
    MdInputModule,
    MdGridListModule
  ],
  providers: [
    ApiService,
    UserManagementService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
