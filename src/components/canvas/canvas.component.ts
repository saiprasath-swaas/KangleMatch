import {Component,Input,Output,OnChanges,EventEmitter} from '@angular/core';

@Component({
    moduleId:module.id,
    selector:'app-canvas',
    templateUrl:'./canvas.component.html',
    styleUrls:['./canvas.component.css']
})

export class CanvasComponent {
    @Input('opts') options:Array<string> = [];
    @Output() isOptionsEmitted = new EventEmitter();

    border:string;
    boxshadow:string;
    visibility:string;
    isMouseDown:boolean = false;
    isSelected:boolean = false;

    constructor() {
        this.border = "1px solid #ddd";
        this.visibility = "visible";
        this.boxshadow = "0px transparent";
        this.isSelected;
        this.isOptionsEmitted.emit();
     }

    change(j) {    
        this.isOptionsEmitted.emit({id:j});
    }

    onMouseUp(event:MouseEvent,j) {
        this.border = "3px solid #ddd";
        this.boxshadow = "2px #ddd";
        this.isMouseDown = false;
        localStorage.setItem('j',j);
    }

    onMouseDown(event:MouseEvent,j) {
        this.border = "3px solid #ddd";
        this.boxshadow = "2px #ddd";
        console.log(j);
        this.isMouseDown = true;
        this.options.forEach((el,i) => {
            if(j == i) {
                this.isSelected = true;
                return;
            }
            else {            
                this.isSelected = false;
            } 
        });
    }
}