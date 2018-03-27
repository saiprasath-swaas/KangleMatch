import { Component, OnInit,HostListener,ViewChild,ElementRef,Renderer2} from "@angular/core";
import { Questions } from "../q1/q1.component";
import {Observable} from 'rxjs/rx';
import {Q2Service} from '../shared/q2.service';

@Component({
    moduleId:module.id,
    selector:'app-q2',
    templateUrl:'q2.component.html',
    styleUrls:['./q2.component.css'],
    providers:[Q2Service]
})

export class Q2Component implements OnInit {
    
    @ViewChild('canvas') public CanvasElem : ElementRef;

    questionIndex:number;
    prevQuestionIndex:number;
    answerIndex:number = 0;
    count:number = 0;
    questiony:number;
    answerx:number;
    answery:number;
    x1:number;
    y1:number;
    question:string;
    answer:string;
    cx:CanvasRenderingContext2D; 
    answerTop:number;
    questionLeft:number;
    questionTop:number;
    canvasWidth:number;
    qindexdisabled:Array<number> = [];
    consindex:Array<number> = [];
    QAnswers:Array<Questions> = [];
    convasEl:HTMLCanvasElement;
    index:number;
    questionsArray:Array<String>;
    answersArray:Array<String>;
    lines:Array<any> = [];
    colorsArray:Array<string>;


    constructor(private render:Renderer2,private _q2service:Q2Service,private elem:ElementRef) {
        this.questionsArray = ["Tamil Nadu","Kerala","Karnataka","Andhra Pradesh"];
        this.answersArray = ["Chennai","Trivandrum","Bangalore","Vijayawada"];
    }
    ngOnInit() 
    {
        this.questionLeft = 0;
        this.colorsArray = ["green","blue","yellow","red"];
        this.count = -1;
    }

    ngAfterViewInit() {      
         this.convasEl = this.CanvasElem.nativeElement;
         this.cx = this.convasEl.getContext("2d");  
    }

    onquestionSelected(args,index:number) {
        
        this.count++;
        if(this.questionIndex!=null) 
            this.prevQuestionIndex = this.questionIndex;

        this.questiony = args.y;
        let id = '#question'+index;
        this.questionTop = this.elem.nativeElement.querySelector(id).offsetTop; 
        this.questionIndex = index;
        this.question = args.target.value;
    }
    
     onanswerselected(args,index:number) {
        let path;
        this.answerx = args.x;
        this.answery = args.y;
        if(this.questionIndex != null) 
        {
            this.answer = args.target.value;
            if(this.answerIndex != null) 
            {
                if((this.prevQuestionIndex != null) && (this.prevQuestionIndex == this.questionIndex)) 
                {
                    this.elem.nativeElement.querySelector('#answer'+this.answerIndex).disabled = false;
                    this.cx.clearRect(0,0,this.convasEl.width,this.convasEl.height);
                    
                    console.log("lineslength:"+this.lines.length);
                    this.lines.splice((this.lines.length-1),1);
                    console.log("lineslength:"+this.lines.length);
                    console.log("count:"+this.count);
                    this.reDrawAll(path);
                    this.drawPath(index);
                }
                else {
                    console.log("count:"+this.count);
                    this.drawPath(index);
                    this.prevQuestionIndex = this.questionIndex;
                }            
            }      
        }
        else 
            alert("Please select any question");      
    }
    // @HostListener('mouseover')
    // onMouseOver(event:MouseEvent) {
    //     debugger;
    //     console.log(JSON.stringify(event));
    //     console.log(event.target);
    // }
    
    drawPath(index,path?:Path2D) {
        this.answerIndex = index;  
        
        path = new Path2D();
        let id = '#answer'+this.answerIndex; 

        this.canvasWidth = this.CanvasElem.nativeElement.width;
        this.elem.nativeElement.querySelector(id).disabled = true;
        this.answerTop = this.elem.nativeElement.querySelector(id).offsetTop;

        this.cx.globalCompositeOperation = "source-in";
        let x = this.questionLeft;
        let y = this.questiony/2 + (this.questionTop/4 - this.questionTop/8);
        path.moveTo(x,y);
        let x1 = this.canvasWidth/2 + 25;
        let y1 = this.answery/2 + (this.answerTop/4  - this.answerTop/8);  
        path.lineTo(x1,y1);

        path.closePath();
        
        this.cx.lineWidth = 3;
        this.cx.globalCompositeOperation = "source-over";
        // this.cx.fillStyle = this.colorsArray[this.count];
        // this.cx.fill(path);
        this.cx.strokeStyle = this.colorsArray[this.count];
        this.cx.stroke(path);
        
        this.QAnswers.push({
            QuestionId:this.questionIndex,
            QuestionName:this.question,
            AnswerId:this.answerIndex,
            Answer:this.answer
        });
        var obj = {
            x1:x,
            y1:y,
            x2:x1,
            y2:y1,
            color:this.colorsArray[this.count]
        };
        console.log(JSON.stringify(obj));

        this.lines.push(obj);
        this.consindex.push(this.answerIndex);

        // if(this.answerIndex) {
        //     this.questionIndex = null;
        // }  
    }
    getDisabled(index:number) {
        if(this.consindex[0] == index || this.consindex[1] == index || this.consindex[2] == index || this.consindex[3] == index) {
            return true;
        }
        else {
            return false;
        }
    }

    reDrawAll(path:Path2D) {
        this.lines.forEach((element,i) => {
            console.log("element.color"+element.color);
            path = new Path2D();
            this.cx.globalCompositeOperation = "source-in";
            path.moveTo(element.x1,element.y1);
            path.lineTo(element.x2,element.y2);
            path.closePath();
            
            this.cx.lineWidth = 3;
            this.cx.globalCompositeOperation = "source-over";
            // this.cx.fillStyle = element.color;
            // this.cx.fill(path);
            this.cx.strokeStyle = element.color;
            this.cx.stroke(path);
        });
    }

    send() {
        var data = 
        {
            "Id":2,
            "Options":this.QAnswers
        }
    }
    
    resetAll() 
    {
        this.cx.save();
        this.cx.clearRect(0,0,this.convasEl.width,this.convasEl.height);
        this.answersArray.forEach((el,index) => {
            let id = '#answer'+index;
            this.elem.nativeElement.querySelector(id).disabled = false;
        }); 
        
        this.QAnswers = [];
        this.consindex = [];
        this.lines = [];
        this.index = null;
        this.questionIndex = null;
        this.count = 0;
        this.cx.restore();
    }

    // reset() 
    // {      
    //     this.cx.save();
    //     this.cx.globalCompositeOperation = "destination-out";
    //     this.QAnswers.forEach((e,i) => {
    //         if(this.answerIndex == e.AnswerId) {
    //             let id = '#answer'+this.answerIndex;
    //             this.QAnswers.splice(i,1);
    //             this.lines.splice(i,1);
    //             this.consindex.splice(i,1);
    //             this.elem.nativeElement.querySelector(id).disabled = false;
                
                
    //             this.questionIndex = null;
    //             this.cx.restore();
    //         }
    //     });
    // }
    //    getRndColor() {
    //     // var r = 255*Math.random() | 0;
    //     // var g = 255*Math.random() | 0;
    //     // var b = 255*Math.random() | 0;
    //     // return 'rgb('+r+','+g+','+b+')';
    //     
    //     if(this.index != null) {
    //         ColorsArray.splice(this.index,1);
    //     }
    //     this.index = Math.floor(ColorsArray.length * Math.random()); 
    //     return this.ColorsArray[this.index];
    // }
}