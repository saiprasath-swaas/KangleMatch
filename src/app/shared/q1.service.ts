import {Injectable} from '@angular/core';
import {Http, RequestOptions,Headers} from '@angular/http';
import {Questions} from '../q1/q1.component';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Q1Service {
    
    private URL = "~/questions.json";
    constructor(private http:Http) {}

    send(questions:Questions):Observable<any> {
        var headers = new Headers();
        headers.append('Accept','application/json');
        headers.append('Content-Type','application/json');
        var options = new RequestOptions({headers:headers});
        
        return this.http.post(this.URL,questions,options);
        // .map()
    }

    getAnswer() {
        var headers = new Headers();
        headers.append('Accept','application/json');
        headers.append('Content-Type','application/json');
        var options = new RequestOptions({headers:headers});
        return this.http.get(this.URL,options);
    }
}