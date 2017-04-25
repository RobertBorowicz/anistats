import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  allAnime: any;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.userService.getAnime(this.route.snapshot.params['name']).subscribe(anime => {
        this.allAnime = JSON.stringify(anime);
      });
  }
}

interface Anime {
  anime_id: number;
  title: String;
}
