import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  subject = new Subject<number>();
  subject$ = this.subject.asObservable()

  behaviourSubject = new BehaviorSubject<number>(0)
  behaviourSubject$ = this.behaviourSubject.asObservable();

  constructor() { }

  updateSubject(num: number){
    this.subject.next(num)
  }

  getSubject(){
    return this.subject$
  }

  updateBehaviourSubject(num: number){
    this.behaviourSubject.next(num)
  }

  getBehaviourSubject(){
    return this.behaviourSubject$
  }


}