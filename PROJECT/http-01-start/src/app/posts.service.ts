import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(private http: HttpClient) {};
  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http
      .post<{name: string}>(
        'https://ng-complete-guide-73476.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  fetchPosts() {
    return this.http
      .get<{[key: string]: Post}>('https://ng-complete-guide-73476.firebaseio.com/posts.json')
      .pipe(map(responsiveData => {
        const postsArray: Post[] = [];
        for (const key in responsiveData) {
          if (responsiveData.hasOwnProperty(key))
          postsArray.push({...responsiveData[key], id: key});
        }
        return postsArray;
      }))
  }
}
