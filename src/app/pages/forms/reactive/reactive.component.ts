import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent {

  constructor(private fb: FormBuilder) { }
  
  name = new FormControl('');
  profileForm = this.fb.group({
    firstName: ['Javi', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: ['Novelda', Validators.minLength(5)],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  })

  // profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   address: new FormGroup({
  //     street: new FormControl('calle'),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     zip: new FormControl('')
  //   }),
  //   aliases: new FormArray([])
  // });


  updateName(){
    this.name.setValue('Pepe')
  }

  updateProfile(){
    this.profileForm.patchValue({
      firstName: 'Jaime',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

}
