import { Component, OnInit } from '@angular/core';
import { DataService } from './data/data.service';
import { Observable, bufferTime, combineLatest, concat, concatMap, debounceTime, delay, filter, forkJoin, from, fromEvent, interval, map, merge, mergeMap, of, share, shareReplay, startWith, switchMap, take, takeUntil, tap, timer, withLatestFrom } from 'rxjs';

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
  interval$ !: Observable<any>
  timer$ !: Observable<any> 

  //Http Observables
  pokemons$ !: Observable<any>
  pokemon$ !: Observable<any>
  

  ngOnInit(): void {
  
    this.emitSubject()
    this.emitBehaviourSubject();
    this.emitAsyncSubject()
    this.emitReplaySubject()

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

  emitAsyncSubject() {
    this.dataService.updateAsyncSubject(1)
    this.dataService.updateAsyncSubject(2)
    this.dataService.updateAsyncSubject(3)
    this.dataService.getAsyncSubject().subscribe(data => {
      console.log('Async Subject', data)
    })

    this.dataService.updateAsyncSubject(4)
    this.dataService.completeAsyncSubject() //emits last value given after complete. Emits before complete won't emit
  }

  emitReplaySubject() {
    this.dataService.updateReplaySubject(1) //is not emitted because bufferSize is 3
    this.dataService.updateReplaySubject(2) //is emitted
    this.dataService.updateReplaySubject(3) //is emitted
    this.dataService.updateReplaySubject(4) //is emitted
    this.dataService.getReplaySubject().subscribe(data => {
      console.log('Replay Subject', data)
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
    
    //emit numbers in sequence based on given timeframe
    this.interval$ = interval(500)
    
    //after given duration, emit numbers in sequence every specified duration (second argument)
    this.timer$ = timer(5000)
    
    //httpClient returns data from API as an Observable
    this.pokemons$ = this.dataService.getPokemons()
    this.pokemon$ = this.dataService.getPokemon()
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

  combineObservables(){

    //combineLatest create a new observable joining in an array the latest emission of both observables 
    const combine1 = combineLatest([this.pokemon$, this.pokemons$])
    combine1.subscribe(value => console.log('combineLatest', value))

    //withLatestFrom create a new observable like combineLatest (new array) but it's created from first observable with the last emission of the observable given
    const combine2 = this.pokemon$.pipe(
      withLatestFrom(this.pokemons$)
    )
    combine2.subscribe(value => console.log('withLatestFrom', value))

    //concat joins in order the emissions of both observables
    const combine3 = concat(of(1, 2, 3), of(4, 5, 6))
    combine3.subscribe(value => console.log('concat', value))

    //merge joins the emissions of both observables not respecting the order. The emissions are mixing. 
    const combine4 = merge(interval(1000), interval(500))
    combine4.subscribe(value => console.log('merge', value))

    //startWith joins the original observable with one first emission custom given in the argument
    const combine5 = this.pokemon$.pipe(
      startWith('startWith, primero emito esto')
    )
    combine5.subscribe(value => console.log('startWith', value))

  }

  transformObservables(){
    //take values emited during given time and set them into an array, which is finally after 5s
    this.interval$.pipe(bufferTime(5000)).subscribe(data => console.log('bufferTime', data))

    //values emited are transformed and they are emited IN ORDER due to concat. Emisions are in a cue and when one finishes, next is emited wihout losing any emision (if loses the emision during procesing another one is EXHAUSTMAP)
    this.of$.pipe(
      concatMap(val => of(`Producto procesado: ${val}`).pipe(delay(1000)))
    ).subscribe(data => console.log('concatMap', data))

    //transform values emited
    this.from$.pipe(map(val => val + 10)).subscribe(data => console.log(data))

    const clickObservableMerge = fromEvent(document, 'click')
    const intervalObservableMerge = interval(1000);

    //merge emits values of more than one observable at the same time
    clickObservableMerge.pipe(
      mergeMap(() => intervalObservableMerge.pipe(
        tap(val => console.log(`mergeMap: ${val}`))
      ))
    ).subscribe();

    const clickObservableSwitch = fromEvent(document, 'click')
    const intervalObservableSwitch = interval(1000);

    //switch only allows last observable incoming to emit values
    clickObservableSwitch.pipe(
      switchMap(() => intervalObservableSwitch.pipe(
        tap(val => console.log(`switchMap: ${val}`))
      ))
    ).subscribe();
    
  }

  multicast() {
    this.pokemons$ = this.dataService.getPokemons().pipe(
      tap(() => console.log('get pokemon')),
      //calls the api only once despite having two async pipes in HTML
      shareReplay(1)
    );

    //turns cold observable into hot observable -> without share each source gets different info. With share sources receives the same info from processing
    const source = interval(1000).pipe(
      tap(x => console.log('Processing: ', x)),
      map(x => x * x),
      take(6),
      share()
    );
    
    source.subscribe(x => console.log('subscription 1: ', x));
    source.subscribe(x => console.log('subscription 2: ', x));
  }
  
  subscribeObservables() {
    this.from$.subscribe(data => console.log('from', data))
    this.fromEvent$.subscribe(data => console.log('fromEvent', data))
    this.of$.subscribe(data => console.log('of', data))
    this.interval$.subscribe(data => console.log('interval', data))
    this.timer$.subscribe(data => console.log('timer', data))
  }
}
