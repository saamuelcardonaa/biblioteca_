import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LibroListComponent } from './components/libro-list/libro-list.component';
import { LibroDetalleComponent } from './components/libro-detalle/libro-detalle.component';
import { LibroFormComponent } from './components/libro-form/libro-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'libros', component: LibroListComponent },
  { path: 'libro/:id', component: LibroDetalleComponent },
  { path: 'nuevo', component: LibroFormComponent },
  { path: 'editar/:id', component: LibroFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

