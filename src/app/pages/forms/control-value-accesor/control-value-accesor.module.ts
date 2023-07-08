import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ControlValueAccesorComponent } from './control-value-accesor.component';

const routes: Routes = [
  { path: '', component: ControlValueAccesorComponent},
];

@NgModule({
  declarations: [
    ControlValueAccesorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ControlValueAccesorModule { }
