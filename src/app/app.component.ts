import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-perf';
  posts$:Observable<any>;
  constructor(
    private http:HttpClient
  ) {

  }
  ngOnInit() {
    this.getAllPosts();
  }
  getAllPosts() {
    this.posts$ = this.http.get('api/posts')
  }
}
