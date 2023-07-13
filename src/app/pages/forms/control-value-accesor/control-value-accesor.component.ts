import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-control-value-accesor',
  templateUrl: './control-value-accesor.component.html',
  styleUrls: ['./control-value-accesor.component.scss']
})
export class ControlValueAccesorComponent {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      myInput: ''
    }); 

    this.myForm.valueChanges.subscribe((data: any) => console.log(data))
    
  }
}
