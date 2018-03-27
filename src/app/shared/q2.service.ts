import {Injectable} from '@angular/core';
import {Http, RequestOptions,Headers} from '@angular/http';
import {Questions} from '../q1/q1.component';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Q2Service {
    
    private URL:string = "~/app/shared/questions.json";
    constructor(private http:Http) {}

    send(data):Observable<any> {
        var headers = new Headers();
        headers.append('Accept','application/json');
        headers.append('Content-Type','application/json');
        var options = new RequestOptions({headers:headers});
        console.log("data",data);
        return this.http.post(this.URL,data,options);
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