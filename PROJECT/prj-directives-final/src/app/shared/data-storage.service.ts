import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators"
import { RecipeService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/recipe.model";

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

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://ng-course-recipe-book-f2d7b.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })

      )
  }
}
