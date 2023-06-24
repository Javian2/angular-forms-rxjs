import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'forms', loadChildren: () => import('./pages/forms/forms.module').then(m => m.FormsModule) },
  { path: 'rxjs', loadChildren: () => import('./pages/rxjs/rxjs.module').then(m => m.RxjsModule) },
  { path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
