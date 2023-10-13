import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  subject$ = new Subject<number>();
  behaviourSubject$ = new BehaviorSubject<number>(0) //initial value
  asyncSubject$ = new AsyncSubject<number>()
  replaySubject$ = new ReplaySubject(3) //bufferSize

  constructor(
    private http: HttpClient
  ) { }

  updateSubject(num: number){
    this.subject$.next(num)
  }

  getSubject(){
    return this.subject$.asObservable();
  }

  updateBehaviourSubject(num: number){
    this.behaviourSubject$.next(num)
  }

  getBehaviourSubject(){
    return this.behaviourSubject$.asObservable()
  }

  updateAsyncSubject(num: number) {
    this.asyncSubject$.next(num)
  }

  completeAsyncSubject() {
    this.asyncSubject$.complete()
  }

  getAsyncSubject() {
    return this.asyncSubject$.asObservable()
  }

  updateReplaySubject(num: number) {
    this.replaySubject$.next(num)
  }
  
  getReplaySubject(){
    return this.replaySubject$.asObservable()
  }

  getPokemons(){
    return this.http.get('https://pokeapi.co/api/v2/pokemon');
  }

  getPokemon(){
    return this.http.get('https://pokeapi.co/api/v2/pokemon-species/aegislash');
  }


}
