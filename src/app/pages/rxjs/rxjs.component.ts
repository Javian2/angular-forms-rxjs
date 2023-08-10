import { Component, OnInit } from '@angular/core';
import { DataService } from './data/data.service';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  
    this.emitSubject()
    this.emitBehaviourSubject();

  }

  emitSubject(){
    this.dataService.updateSubject(1) //not going to emit because observable is not suscribed yet
    this.dataService.getSubject().subscribe(data => {
      console.log('Subject', data)
    })
    this.dataService.updateSubject(2) //observable is suscribed, so 2 is emited
  }

  emitBehaviourSubject(){
    this.dataService.updateBehaviourSubject(1) //is emitting despite observable is not suscribed. Without this line, initial value is emited
    this.dataService.getBehaviourSubject().subscribe(data => {
      console.log('Behaviour Subject', data)
    })
  }

}
