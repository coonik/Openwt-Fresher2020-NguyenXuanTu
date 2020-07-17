import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipes.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {

  }

  storeRecipes() {
    const recipes = this.recipeService.getRepices();
    this.http
      .put('https://ng-course-recipe-book-f2d7b.firebaseio.com/recipes.json', recipes)
        .subscribe(
          response => {
            console.log(response);

          }
        );
      // return 0;
  }
}
