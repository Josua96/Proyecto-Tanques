import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WebSocketService } from './Services/web-socket.service';
import { ConnectioncontrollerService } from './Services/connectioncontroller.service';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { GameMainViewComponent } from './game-main-view/game-main-view.component';

//here is necesary to set all module routes
const routes: Routes = [
  { path: '', component: GameMainViewComponent},
  {path:'gameMainView', component: AppComponent}
];

const routerModule = RouterModule.forRoot(routes);

@NgModule({
  declarations: [
    AppComponent,
    GameMainViewComponent
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
