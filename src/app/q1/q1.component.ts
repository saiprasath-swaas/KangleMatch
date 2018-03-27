import { Component, ViewChild, ElementRef, OnInit, Renderer2,HostListener,RendererStyleFlags2, HostBinding } from '@angular/core';
import {Q1Service} from '../shared/q1.service';

export class Questions 
{
  QuestionId:number;
  QuestionName:string;
  AnswerId?:number;
  Answer:any;
}

@Component({
    moduleId:module.id,
    selector: 'app-q1',
    templateUrl:'./q1.component.html',
    styleUrls:['./q1.component.css'],
    providers:[Q1Service]
})

export class Q1Component implements OnInit {

    @ViewChild('container') private container : ElementRef;
    @ViewChild('canvfill') private answer : ElementRef;

    boundary: any = {};
    draggable: any;
    isMouseDown = false;
    private draggableWidth:any;
    private draggableHeight:any;
    public backgroundColor:string;
    public width:number;
    public height:number;
    public transition:string;


  constructor(private renderer: Renderer2,private _q1service:Q1Service) { }

  ngOnInit() {

    const containerr = this.container.nativeElement;
    this.draggable = this.answer.nativeElement;
    // this.draggableWidth = 70;
    // this.draggableHeight = 180;
    this.draggableWidth = containerr.style.width.split('p')[0];
    this.draggableHeight = containerr.style.height.split('p')[0];
    console.log(this.draggableHeight);
    console.log(this.draggableWidth);
    this.boundary = {
      left: containerr.offsetLeft, //50
      right: Number(containerr.offsetLeft) + Number(this.draggableWidth), //48
      top: containerr.offsetTop,
      bottom: Number(containerr.offsetTop) + Number(this.draggableHeight), //117
    };
    console.log(this.boundary);
  }

  @HostListener('mouseup')
  onMouseup() {
    this.isMouseDown = false;
  }

  @HostListener('mousedown',['$event'])
  onMousedown(event:MouseEvent) {
    // console.log(this.draggableHeight+"=="+this.draggableWidth);
    this.isMouseDown = true;
    if(event.y > this.boundary.top /* 138 */ && event.y < this.boundary.bottom /* 26 */ && event.x > this.boundary.left && event.x < this.boundary.right) {    
      
      // this.draggable.addClass('mProgress1');
      this.backgroundColor="grey";
      this.width = this.draggableWidth;
      this.height = this.boundary.bottom - event.y;
      // this.fillStyle = "grey";
      this.progress(this.height);
    } 
  }

  progress(heigh:number) {
    this.draggable.animate({
      height:heigh
    },2000,function() {});
  }
  
  send() {

  }
  
  goTo() {
    console.log("next");
    this._q1service.getAnswer().subscribe(data => {
      console.log(data);
    });
  }
}
