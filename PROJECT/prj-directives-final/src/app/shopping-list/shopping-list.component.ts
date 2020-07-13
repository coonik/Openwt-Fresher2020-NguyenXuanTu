import { ShoppingListService } from "./shopping-list.service";
import { Component, OnInit } from "@angular/core";

import { Ingredient } from "../shared/ingredient.model";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
  providers: [ShoppingListService],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.ingredients;
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.shoppingListService.addIngredient(ingredient);
  }
}
