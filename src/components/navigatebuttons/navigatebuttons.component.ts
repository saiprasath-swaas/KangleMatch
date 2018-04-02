import {Component,OnChanges,EventEmitter,Output,Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    moduleId:module.id,
    selector:'app-navigatebuttons',
    templateUrl:'./navigatebuttons.component.html',
    styleUrls:['./navigatebuttons.component.css']
})

export class NavigateButtonsComponent {
    @Output() prevemit = new EventEmitter();
    @Output() nextemit = new EventEmitter();
    @Output() sendemit = new EventEmitter();
    @Output() resetemit = new EventEmitter();

    send() {
        this.sendemit.emit();
    }
    prev() {
        this.prevemit.emit();
    }
    reset() {
        this.resetemit.emit();
    }
    next() {
        console.log("next");
        this.nextemit.emit();
    }

    // ngOnChanges() {
    //     this.prevemit.emit();
    //     this.nextemit.emit();
    //     this.sendemit.emit();
    //     this.resetemit.emit();
    // }
    // change() { 
    //     this.prevemit.emit();
    //     this.nextemit.emit();
    //     this.sendemit.emit();
    //     this.resetemit.emit();
    // }


}