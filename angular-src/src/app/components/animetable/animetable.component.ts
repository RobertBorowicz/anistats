import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'animetable',
  templateUrl: './animetable.component.html',
  styleUrls: ['./animetable.component.css']
})
export class AnimetableComponent implements OnInit {

    @Input() anime: any;

    columns = [
        { prop: 'title' },
        { name: 'Score', 
          prop: 'user_score' },
        { name: 'Status',
          prop: 'user_status' }
    ];

    settings = {
    columns: {
      title: {
        title: 'Title',
      },
      user_score: {
        title: 'Score',
        filter: {
          type: 'list',
          config: {
            selectText: 'Score',
            list: [
              { value: 10, title: 'Masterpiece (10)' },
              { value:  9, title: 'Great (9)' },
              { value:  8, title: 'Very Good (8)' },
              { value:  7, title: 'Good (7)' },
              { value:  6, title: 'Fine (6)' },
              { value:  5, title: 'Average (5)' },
              { value:  4, title: 'Bad (4)' },
              { value:  3, title: 'Very Bad (3)' },
              { value:  2, title: 'Horrible (2)' },
              { value:  1, title: 'Apalling (1)' },
            ],
          },
        },
      },
      user_status: {
        title: 'Status',
        valuePrepareFunction: (value, row) => {
          switch(value) {
              case '1':
                  return "Currently Watching";
              case '2':
                  return "Completed";
              case '3':
                  return "On Hold";
              case '4':
                  return "Dropped";
              case '6':
                  return "Plan to Watch";
              default:
                  return "None";
          }
        },
        sort: true,
        sortDirection: 'asc',
        filter: {
          type: 'list',
          config: {
            selectText: 'All',
            list: [
              { value: '1', title: 'Watching' },
              { value: '2', title: 'Completed' },
              { value: '3', title: 'On Hold' },
              { value: '4', title: 'Dropped' },
              { value: '6', title: 'Plan to Watch' },
            ],
          },
        },
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    pager: {
      perPage: 50
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
