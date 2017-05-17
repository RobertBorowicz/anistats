import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mangatable',
  templateUrl: './mangatable.component.html',
  styleUrls: ['./mangatable.component.css']
})
export class MangatableComponent implements OnInit {

    @Input() manga: any;

    columns = [
        { prop: 'title' },
        { name: 'Score', 
          prop: 'user_score' },
        { name: 'Status',
          prop: 'user_status' }
    ];


  constructor() { }

  ngOnInit() {
  }

  convertStatus(status): string {
      switch(status) {
          case '1':
              return "Currently Reading";
          case '2':
              return "Completed";
          case '3':
              return "On Hold";
          case '4':
              return "Dropped";
          case '6':
              return "Plan to Read";
          default:
              return "None";
        }
  }

}
