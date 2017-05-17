import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  userAnime: any;
  userManga: any;

  constructor(private http:Http) { }


  getBasicUserInfo(user: string) {
      return this.http.get('http://localhost:8080/api/user/' + user)
          .map(res => res.json())
  }

  getAnime(user) {
      return this.http.get('http://localhost:8080/api/user/' + user + '/anime')
          .map(res => res.json())
  }

  getManga(user) {
      return this.http.get('http://localhost:8080/api/user/' + user + '/manga')
          .map(res => res.json())
  }
}

interface BasicUser {
    name: string;
    anime: any;
    manga: any;
}
