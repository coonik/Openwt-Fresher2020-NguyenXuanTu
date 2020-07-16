import { PostsService } from './posts.service';
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
  loadedPosts: Post[] = [];
  postIsLoading = false;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.postIsLoading = true;
    this.postsService.fetchPosts()
      .subscribe(
        posts => {
          this.postIsLoading = false;
          this.loadedPosts = posts;
        }
      );
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request

    this.postIsLoading = true;
    this.postsService.fetchPosts()
      .subscribe(
        posts => {
          this.postIsLoading = false;
          this.loadedPosts = posts;
        }
      );
  }

  onClearPosts() {
    // Send Http request
  }
}
