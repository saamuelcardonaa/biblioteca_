import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Servicios
import { LibroService } from './services/libro.service';

// Componentes
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LibroListComponent } from './components/libro-list/libro-list.component';
import { LibroDetalleComponent } from './components/libro-detalle/libro-detalle.component';
import { LibroFormComponent } from './components/libro-form/libro-form.component';

@NgModule({ declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        HomeComponent,
        LibroListComponent,
        LibroDetalleComponent,
        LibroFormComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule], providers: [LibroService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }

