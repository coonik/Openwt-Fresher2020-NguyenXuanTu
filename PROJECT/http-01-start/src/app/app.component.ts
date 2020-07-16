import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post<{name: string}>(
        'https://ng-complete-guide-73476.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http
      .get<{[key: string]: Post}>('https://ng-complete-guide-73476.firebaseio.com/posts.json')
      .pipe(map(responsiveData => {
        const postsArray: Post[] = [];
        for (const key in responsiveData) {
          if (responsiveData.hasOwnProperty(key))
          postsArray.push({...responsiveData[key], id: key});
        }
        return postsArray;
      }))
      .subscribe( posts => {
        console.log(posts);

      })
  }
}
