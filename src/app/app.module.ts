import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


//Modulos
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
//componentes
import { AppComponent } from './app.component';
import { ListCategoriasComponent } from './components/list-categorias/list-categorias.component';
import { CreateImagenesComponent } from './components/create-imagenes/create-imagenes.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoriasListComponent } from './components/cliente/categorias-list/categorias-list.component';

//firebase
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth, AuthModule } from '@angular/fire/auth';
import { provideStorage,getStorage } from '@angular/fire/storage';
//import { AngularFireAuthModule } from '@angular/fire/auth';



import { NewPlaceComponent } from './components/new-place/new-place.component';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { MaterialModule } from './material.module';

import { AsyncPipe, CommonModule } from '@angular/common';
import { ShopsListComponent } from './components/cliente/shops-list/shops-list.component';
import { NegocioListComponent } from './components/cliente/negocio-list/negocio-list.component';
import { EspecialistaListComponent } from './components/cliente/especialista-list/especialista-list.component';
import { FechaComponent } from './components/cliente/fecha/fecha.component';
import { HorarioComponent } from './components/cliente/horario/horario.component';
import { ConfirmacionComponent } from './components/cliente/confirmacion/confirmacion.component';
import { ReservasListComponent } from './components/cliente/reservas-list/reservas-list.component';
import { InfoComponent } from './components/cliente/info/info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuSocioComponent } from './components/socio/menu-socio/menu-socio.component';
import { CitasListComponent } from './components/socio/citas-list/citas-list.component';
import { AdminSocioComponent } from './components/socio/admin-socio/admin-socio.component';
import { GaleryAddComponent } from './components/socio/galery-add/galery-add.component';
import { GaleryDeleteComponent } from './components/socio/galery-delete/galery-delete.component';
import { StoreAddComponent } from './components/socio/store-add/store-add.component';
import { StoreDeleteComponent } from './components/socio/store-delete/store-delete.component';

//noti
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireModule } from '@angular/fire/compat';
import { PushNotificationService } from './services/push-notification.service';
import { CalificacionComponent } from './components/cliente/calificacion/calificacion.component';
import { DesabilitarNegocioComponent } from './components/socio/desabilitar-negocio/desabilitar-negocio.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarDateFormatter, CalendarModule, DateAdapter } from 'angular-calendar';
import { CustomDateFormatter } from './services/CustomDateFormatter';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { InfoVideoComponent } from './components/info-video/info-video.component';
// import { FullCalendarModule } from 'primeng/';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,
    ListCategoriasComponent,
    CreateImagenesComponent,
    NavbarComponent,
    NewPlaceComponent,
    PlaceListComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    CategoriasListComponent,
    ShopsListComponent,
    NegocioListComponent,
    EspecialistaListComponent,
    FechaComponent,
    HorarioComponent,
    ConfirmacionComponent,
    ReservasListComponent, 
    InfoComponent,
    MenuSocioComponent,
    CitasListComponent,
    GaleryAddComponent,
    GaleryDeleteComponent,
    StoreAddComponent,
    StoreDeleteComponent,
    AdminSocioComponent,
    CalificacionComponent,
    DesabilitarNegocioComponent,
    InfoVideoComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    BrowserAnimationsModule, provideAuth(() => getAuth()), provideStorage(() => getStorage()),
    MaterialModule,//importamos material desde el material.module.ts
    CommonModule, //esto creo no es necesario
    FormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule,

    AuthModule,//NOTI
    //AngularFireMessaging,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),



    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),  
    HttpClientModule,
    FullCalendarModule

  ],
  providers: [PushNotificationService, AsyncPipe  ,  { provide: CalendarDateFormatter, useClass: CustomDateFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// export class ShopsListModule { }
 