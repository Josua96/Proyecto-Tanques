import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WebSocketService } from './Services/web-socket.service';
import { ConnectioncontrollerService } from './Services/connectioncontroller.service';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { GameMainViewComponent } from './game-main-view/game-main-view.component';
import { MainViewComponent } from './main-view/main-view.component';

//here is necesary to set all module routes
const routes: Routes = [
  {path:'main', component: MainViewComponent},
  { path: '', component: MainViewComponent},
  {path:'gameMainView', component: GameMainViewComponent}
];

const routerModule = RouterModule.forRoot(routes);

@NgModule({
  declarations: [
    AppComponent,
    GameMainViewComponent,
    MainViewComponent
  ],
  imports: [
    routerModule,
    FormsModule,
    BrowserModule
  ],
  providers: [WebSocketService, ConnectioncontrollerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
