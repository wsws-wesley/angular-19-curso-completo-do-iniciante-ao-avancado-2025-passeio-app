import { TemplateComponent } from './template.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    data: {
      titulo: 'Login'
    },
    children: [
      {
        path: 'categorias',
        loadChildren: () => import('../categorias/categorias.module').then(m => m.CategoriasModule),
        data: {
          titulo: 'Categorias'
        }
      },
      {
        path: 'locais',
        loadChildren: () => import('../locais/locais.module').then(m => m.LocaisModule),
        data: {
          titulo: 'Locais'
        }
      },
      {
        path: 'galeria',
        loadChildren: () => import('../galeria/galeria.module').then(m => m.GaleriaModule),
        data: {
          titulo: 'Galeria'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }