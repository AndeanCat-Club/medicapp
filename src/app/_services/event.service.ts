import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

export class EventService {

    events: any = {};

    constructor(){
    }

    addEventEmitter(key: string){
        this.events[key] = new EventEmitter();
    }

    emitEventValue(key: string, value: any){
        this.events[key].emit(value)
    }

    getEventEmitter(key: string){
        return this.events[key];
    }

}