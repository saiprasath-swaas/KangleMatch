import {Component,Input,OnInit} from '@angular/core';
import {SlotModel} from '../shared/slotmodel/slot.model';

@Component({
    moduleId:module.id,
    selector:'Q4',
    templateUrl:'./q4.component.html',
    styleUrls:['./q4.component.css']
})

export class Q4Component implements OnInit {
    Options:Array<string> = [];
    length:number=0;
    Answers:Array<SlotModel> = [];
    ngOnInit() {
    }
}