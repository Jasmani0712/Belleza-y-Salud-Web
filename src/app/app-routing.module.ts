import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriasComponent } from './components/list-categorias/list-categorias.component';
import { CreateImagenesComponent } from './components/create-imagenes/create-imagenes.component';
import { NewPlaceComponent } from './components/new-place/new-place.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { ShopsListComponent } from './components/cliente/shops-list/shops-list.component';
import { CategoriasListComponent } from './components/cliente/categorias-list/categorias-list.component';
import { NegocioListComponent } from './components/cliente/negocio-list/negocio-list.component';
import { ConfirmacionComponent } from './components/cliente/confirmacion/confirmacion.component';
import { HorarioComponent } from './components/cliente/horario/horario.component';
import { FechaComponent } from './components/cliente/fecha/fecha.component';
import { EspecialistaListComponent } from './components/cliente/especialista-list/especialista-list.component';
import { ReservasListComponent } from './components/cliente/reservas-list/reservas-list.component';
import { MenuSocioComponent } from './components/socio/menu-socio/menu-socio.component';
import { CitasListComponent } from './components/socio/citas-list/citas-list.component';
import { AdminSocioComponent } from './components/socio/admin-socio/admin-socio.component';
import { GaleryAddComponent } from './components/socio/galery-add/galery-add.component';
import { GaleryDeleteComponent } from './components/socio/galery-delete/galery-delete.component';
import { StoreAddComponent } from './components/socio/store-add/store-add.component';
import { StoreDeleteComponent } from './components/socio/store-delete/store-delete.component';
import { CalificacionComponent } from './components/cliente/calificacion/calificacion.component';
import { DesabilitarNegocioComponent } from './components/socio/desabilitar-negocio/desabilitar-negocio.component';
import { InfoVideoComponent } from './components/info-video/info-video.component';

//redirecciones de url
const routes: Routes = [
  // {path:'',redirectTo:'list-categorias',pathMatch:'full'},
  
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  // {path: 'list-categorias/id', component:ListCategoriasComponent},
  {path:'create-imagenes', component:CreateImagenesComponent},
  {path:'app-new-place', component:NewPlaceComponent},
  {path:'PlaceListComponen', component:PlaceListComponent},



  { path: 'main', component: MainComponent,    ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'categorias', component: CategoriasListComponent },
  { path: 'reservas', component: ReservasListComponent }, //si lo pongo debajo me lleva a negocio
  { path: 'socio/:id_socio', component: MenuSocioComponent }, //si lo pongo debajo me lleva a negocio
  { path: 'citas-agendadas/:id_socio', component: CitasListComponent }, //si lo pongo debajo me lleva a negocio
  { path: 'admin-socio/:id_socio', component: AdminSocioComponent }, //si lo pongo debajo me lleva a negocio
  { path: 'add-galery/:id_socio', component: GaleryAddComponent }, //si lo pongo debajo me lleva a negocio
  { path: 'delete-galery/:id_socio', component: GaleryDeleteComponent }, //si lo pongo debajo me lleva a negocio
  { path: 'add-store/:id_socio', component: StoreAddComponent }, //si lo pongo debajo me lleva a negocio
  { path: 'delete-store/:id_socio', component: StoreDeleteComponent }, //si lo pongo debajo me lleva a negocio
  {path: 'calificacion/:id_reserva', component: CalificacionComponent }, //si lo pongo debajo me lleva a negocio
  {path: 'desabilitar-negocio/:id_socio', component: DesabilitarNegocioComponent }, //si lo pongo debajo me lleva a negocio
  {path: 'info-video', component: InfoVideoComponent }, //si lo pongo debajo me lleva a negocio



  { path: 'shops/:id', component: ShopsListComponent },
  { path: 'especialistas/:id/:servicio/:servicio_id', component: EspecialistaListComponent },
  { path: 'fecha/:id/:servicio/:especialista', component: FechaComponent },
  { path: 'horario/:id/:servicio/:especialista/:fecha', component: HorarioComponent },
  { path: 'confirmacion/:id/:servicio/:especialista/:fecha/:hora', component: ConfirmacionComponent },
  { path: ':id', component: NegocioListComponent },


  // { path: 'login', component: LoginComponent },


  // {path:'**',redirectTo:'list-categorias',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
