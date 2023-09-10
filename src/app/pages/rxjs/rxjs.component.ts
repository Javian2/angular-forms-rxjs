import { Component, OnInit } from '@angular/core';
import { DataService } from './data/data.service';
import { Observable, debounceTime, filter, from, fromEvent, interval, of, take, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {
  
  constructor(private dataService: DataService) { }
  
  from$!: Observable<any>
  fromEvent$!: Observable<any>
  of$ !: Observable<any>
  http$ !: Observable<any>
  interval$ !: Observable<any>
  timer$ !: Observable<any> 

  ngOnInit(): void {
  
    this.emitSubject()
    this.emitBehaviourSubject();

  }

  // ------------------------------ SUBJECTS ------------------------------------------

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

  // ------------------------------ CREATION ------------------------------------------

  createObservables(){  
    
    //from converts an array or other iterable object to an observable. Emit the elements 1 by 1 and only accept 1 argument
    this.from$ = from([1, 2, 3, 4])

    //fromEvent converts event in observable
    this.fromEvent$ = fromEvent(document, 'click')

    //of converts a list of elements in an Observable where each element is emited in order 
    this.of$ = of([1, 2, 3, 4, 5], 2, 3)
    
    //httpClient returns data from API as an Observable
    this.http$ = this.dataService.getPokemons()

    //emit numbers in sequence based on given timeframe
    this.interval$ = interval(500)

    //after given duration, emit numbers in sequence every specified duration (second argument)
    this.timer$ = timer(5000)
    
  }

  filterObservables(){

    //emit values that pass the provided condition
    this.from$ = this.from$.pipe(
      filter((num: number) => num % 2 === 0)
    )

    //discard emitted values that take less than the specified time between output. Typical for search inputs
    this.fromEvent$ = this.fromEvent$.pipe(
      debounceTime(1500),
    )

    //only emits number of times of given value
    this.of$ = this.of$.pipe(
      take(1)
    )

    this.interval$ = this.interval$.pipe(
      takeUntil(this.timer$)
    )
  }

  subscribeObservables() {
    this.from$.subscribe(data => console.log('from', data))
    this.fromEvent$.subscribe(data => console.log('fromEvent', data))
    this.of$.subscribe(data => console.log('of', data))
    this.http$.subscribe(data => console.log('http', data))
    this.interval$.subscribe(data => console.log('interval', data))
    this.timer$.subscribe(data => console.log('timer', data))
  }



}
