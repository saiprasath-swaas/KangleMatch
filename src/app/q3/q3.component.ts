import {Component,OnInit,ViewChild,ElementRef,HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {SlotModel} from '../shared/slotmodel/slot.model';
import {Options} from '../shared/slotmodel/options.model';



@Component({
    moduleId:module.id,
    selector:'Q3',
    templateUrl:'./q3.component.html',
    styleUrls:['./q3.component.css']
})

export class Q3Component implements OnInit {
    @ViewChild('slots') public slots:ElementRef;

    Options:Array<string> = [];
    length:number=0;
    Answers:Array<SlotModel> = [];
    OptionsAnswered:Array<Options> = [];
    OptionsLength:number;
    isMouseDown:boolean = false;
    convasEl:HTMLCanvasElement;
    cx:CanvasRenderingContext2D;
    button:HTMLButtonElement;
    border:string;
    disp:string;
    boxshadow:string;
    visibility:string;


    constructor(private elem:ElementRef,private _router:Router,private _location:Location) {
        this.Options = ["Insect","Frog","Bird","Dog"];
        this.border = "1px solid #ddd";
        this.boxshadow = "0px transparent";
        this.visibility = "visible";
    }

    isOptionsLoaded(options,length) {
        this.Options.length = length;
        if(length > 0) {
            return true;
        }
    }
    
    ngOnInit() {
        this.Options.forEach((e,i) => {
            let slotId = 'canvas'+i;
            let optionId = 'button'+i;
            this.convasEl = this.elem.nativeElement.querySelector(slotId);
            this.button = this.elem.nativeElement.querySelector(optionId);
        });
        this.disp = "block";
        
     }

    ngAfterViewInit() {
        this.cx = this.convasEl.getContext("2d");
    }

    onDragBegin(event:MouseEvent,i)  { }

    onDragStop(event:MouseEvent,i) {
        let slotClicked = localStorage.getItem('j');
        let slotID = 'canvas'+slotClicked;
        let optionid  = 'button'+i;
        this.OptionsAnswered.push({
            slotId:slotID,
            OptionId:optionid
        });      
        
        localStorage.removeItem('j');
    }
    
    send() 
    {
        this.OptionsAnswered.forEach((elem,i) => {
            console.log(elem.OptionId+"<>"+elem.slotId);
        });
    }
    reset()  {    
        this.visibility = "collapse";
        this.elem.nativeElement.query
    }
    prev() {
        this._location.back();
    }

    onUploadSuccess(event:MouseEvent) {
        console.log("successfully uploaded");
    }
    
    onUploadError(event:MouseEvent) {
        console.log("Error in uploading");
    }
} 