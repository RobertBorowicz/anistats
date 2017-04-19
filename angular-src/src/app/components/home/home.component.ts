import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: String;
  title: String;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onNameSubmit() {
      this.router.navigate(['/user/'+this.username]);
  }

}
