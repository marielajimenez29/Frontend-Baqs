import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndiceAreasComponent } from './areas/indice-areas/indice-areas.component';
import { BaqsCrearComponent } from './baqs/baqs-crear/baqs-crear.component';
import { IndiceBaqsComponent } from './baqs/indice-baqs/indice-baqs.component';
import { CorreoComponent } from './correo/correo.component';
import { ErroresComponent } from './errores/errores.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login/login.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'landingPage', component: LandingPageComponent },

  { path: 'usuarios', component: ListaUsuariosComponent },
  { path: 'usuarios/crear', component: CrearUsuarioComponent },
  { path: 'usuarios/editar/:id', component: EditarUsuarioComponent },

  { path: 'areas', component: IndiceAreasComponent },

  { path: 'baqs', component: IndiceBaqsComponent },
  { path: 'baqs/crear', component: BaqsCrearComponent },
  { path: 'programacion', component: ProgramacionComponent },
  { path: 'correo', component: CorreoComponent },
  { path: 'errores', component: ErroresComponent },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
