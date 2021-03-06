import { PostsService } from './posts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  postIsLoading = false;
  error = null;
  errorSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(
      (errorMessage) => {
        this.error = errorMessage
      }
    )
    this.postIsLoading = true;
    this.postsService.fetchPosts()
      .subscribe(
        posts => {
          this.postIsLoading = false;
          this.loadedPosts = posts;
        }, error => {
          this.error = error.message;
        }
      );
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
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
        }, error => {
          this.postIsLoading = false;
          this.error = error.message;
        }
      );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(
      () => this.loadedPosts = []
    );
  }

  onHandleError() {
    this.error = null
    this.postIsLoading = false;
  }
}
