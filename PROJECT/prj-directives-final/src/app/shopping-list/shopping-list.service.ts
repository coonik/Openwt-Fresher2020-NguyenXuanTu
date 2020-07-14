import { Ingredient } from "./../shared/ingredient.model";
import { EventEmitter, OnInit } from "@angular/core";

export class ShoppingListService implements OnInit {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

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

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
    console.log(this.ingredients);
  }

  addIngredients(ingredientsTemp: Ingredient[]) {
    this.ingredients.push(...ingredientsTemp);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
