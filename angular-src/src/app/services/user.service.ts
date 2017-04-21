import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  constructor(private http:Http) { }


  getAnime(title) {
      return this.http.get('/api/user/' + title)
          .map(res => res.json());
  }
}
