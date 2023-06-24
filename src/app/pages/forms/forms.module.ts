import { NgModule } from '@angular/core';
import { FormsComponent } from './forms.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { 
    path: '', 
    component: FormsComponent,
    children: [
      { path: 'reactive', loadChildren: () => import('./reactive/reactive.module').then(m => m.ReactiveModule) },
      { path: 'template', loadChildren: () => import('./template/template.module').then(m => m.TemplateModule) },
    ]
  },
  
  // Para que la ruta cargue de manera independiente sin cargar también el componente de forms
  // {
  //   path: 'reactive', loadChildren: () => import('./reactive/reactive.module').then(m => m.ReactiveModule) 
  // }

];

@NgModule({
  declarations: [
    FormsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FormsModule { }
