import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-back-button',
  template: `
  <div style="padding: 0.5em; background-color: red; max-width: 50px; text-align: center;">
    <a style="text-decoration: none; color: white;" [routerLink]="[route]">Atrás</a>
  </div>
  <hr>
  `,
})


export class BackButtonComponent {
  
  @Input() route!: string
  
}
