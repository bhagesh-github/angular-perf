import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-perf';
  constructor(
    private http:HttpClient
  ) {

  }
  ngOnInit() {
    this.getAllPosts();
  }
  getAllPosts() {
    this.http.get('api/posts').subscribe(res => {
      console.log('service hit')
    });
  }
}
