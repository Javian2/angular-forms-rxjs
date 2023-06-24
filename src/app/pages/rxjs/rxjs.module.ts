import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsComponent } from './rxjs.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: RxjsComponent},
];

@NgModule({
  declarations: [
    RxjsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RxjsModule { }
