import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  allMedia: any;
  loading: boolean = false;
  currUser: string;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;
    this.currUser = this.route.snapshot.params['name'];

    this.userService.getAnime(this.currUser, 'anime').subscribe(media => {
      this.allMedia = media.list;
      console.log(media.list);
      this.loading = false;
    }, () => this.loading = false);
  }
}

interface Anime {
  anime_id: number;
  title: String;
}
