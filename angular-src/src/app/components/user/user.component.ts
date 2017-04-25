import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  allAnime: any;
  loading: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;
      this.userService.getAnime(this.route.snapshot.params['name']).subscribe(anime => {
        this.allAnime = anime.manga;
        console.log(anime.manga);
        this.loading = false;
      }, () => this.loading = false);
  }
}

interface Anime {
  anime_id: number;
  title: String;
}
