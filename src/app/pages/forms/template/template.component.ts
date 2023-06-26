import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Hero {
  name: string;
  alter_ego: string;
  power: PowerOptions;
  enemies: number;
  dead: boolean;
}

type PowerOptions = 'invisibilidad' | 'fuerza' | 'volar' | 'rayos' | 'fuego'

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})

export class TemplateComponent {

  constructor() { }

  powerNames: string[] = ['invisibilidad', 'fuerza', 'fuego', 'rayos', 'volar']
  heroModel: Hero = {
    name: 'Superman',
    alter_ego: 'Pepe',
    power: 'volar',
    enemies: 1,
    dead: false
  }

  onSubmit(form: NgForm){
    console.log('Propiedades de un formulario ngForm', form)
    console.log('Valores de los campos del formulario', form.value)
  }

  updateFormValues(heroForm: NgForm){
    heroForm.form.patchValue({
      name: 'Batman',
      alter_ego: 'Bruce',
      dead: true
    })
  }

  updateAllFormValues(heroForm: NgForm){
    heroForm.form.setValue({
      name: 'Spiderman',
      alter_ego: 'Peter Parker',
      power: 'fuerza',
      enemies: 5,
      dead: false
    })
  }

}
