import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userInfo: any;
  loading: boolean = false;
  currUser: string;
  showAnime: boolean = true;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;
    this.currUser = this.route.snapshot.params['name'];

    this.userService.getBasicUserInfo(this.currUser).subscribe(media => {
      this.userInfo = media;
      this.loading = false;
    }, () => this.loading = false);
  }

  selectMangaSource(): void {
    this.showAnime = false;
  }

  selectAnimeSource(): void {
    this.showAnime = true;
  }
}

interface UserInfo {
  user: any,
  anime: any,
  manga: any
}
