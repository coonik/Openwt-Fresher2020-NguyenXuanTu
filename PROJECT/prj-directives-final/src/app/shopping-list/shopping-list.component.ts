import { Ingredient } from "./../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    console.log(this.shoppingListService.ingredients);

    this.ingredients = this.shoppingListService.ingredients;
    this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
        console.log(this.shoppingListService.ingredients);
      }
    );
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.shoppingListService.addIngredient(ingredient);
  }
}
