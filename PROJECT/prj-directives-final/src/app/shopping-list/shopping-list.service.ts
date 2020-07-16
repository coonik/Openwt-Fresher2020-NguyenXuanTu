import { Ingredient } from "./../shared/ingredient.model";
import { EventEmitter, OnInit } from "@angular/core";
import { Subject } from "rxjs";

export class ShoppingListService implements OnInit {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditting = new Subject<number>();

  ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ];

  ngOnInit() {
    console.log("init");
  }

  getIngredients() {
    this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index]
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
    console.log(this.ingredients);
  }

  addIngredients(ingredientsTemp: Ingredient[]) {
    this.ingredients.push(...ingredientsTemp);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ing: Ingredient) {
    this.ingredients[index] = ing;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
