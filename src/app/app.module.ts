import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Importar httpclient
import { HttpClientModule } from '@angular/common/http';

///material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
///

import { MenuComponent } from './menu/menu.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { LoginComponent } from './login/login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AutorizadoComponent } from './login/autorizado/autorizado.component';
import { MostrarErroresComponent } from './helpers/mostrar-errores/mostrar-errores.component';
import { SpinnerComponent } from './helpers/spinner/spinner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { CorreoComponent } from './correo/correo.component';
import { ErroresComponent } from './errores/errores.component';
import { IndiceAreasComponent } from './areas/indice-areas/indice-areas.component';
import { IndiceBaqsComponent } from './baqs/indice-baqs/indice-baqs.component';
import { BaqsCrearComponent } from './baqs/baqs-crear/baqs-crear.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListaUsuariosComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    ProgramacionComponent,
    LoginComponent,
    LandingPageComponent,
    AutorizadoComponent,
    MostrarErroresComponent,
    SpinnerComponent,
    FooterComponent,
    CorreoComponent,
    ErroresComponent,
    IndiceAreasComponent,
    IndiceBaqsComponent,
    BaqsCrearComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatChipsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
