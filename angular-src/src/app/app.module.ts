import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { UserService } from './services/user.service';
import { AnimetableComponent } from './components/animetable/animetable.component';
import { MangatableComponent } from './components/mangatable/mangatable.component';

const appRoutes : Routes = [
  {path: '',           component: HomeComponent},
  {path: 'user/:name', component: UserComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UserComponent,
    SpinnerComponent,
    AnimetableComponent,
    MangatableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgxDatatableModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
