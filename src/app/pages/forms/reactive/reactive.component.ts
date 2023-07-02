import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  })

  // profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   address: new FormGroup({
  //     street: new FormControl('calle'),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     zip: new FormControl('')
  //   })
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

}
