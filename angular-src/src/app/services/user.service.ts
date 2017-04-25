import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  constructor(private http:Http) { }


  getAnime(title) {
      return this.http.get('http://localhost:8080/api/user/' + title)
          .map(res => res.json());
  }
}
