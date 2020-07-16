import { Subject } from 'rxjs';
import { ShoppingListService } from "./../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      "A Test Recipe",
      "This is simply a test",
      "https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg",
      [new Ingredient("apple", 12), new Ingredient("coconut", 2)]
    ),
    new Recipe(
      "Another Test Recipe",
      "This is simply a test",
      "https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg",
      [new Ingredient("salt", 12), new Ingredient("sweet", 22)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRepices() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updataRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    return this.recipes.slice();
  }
}
