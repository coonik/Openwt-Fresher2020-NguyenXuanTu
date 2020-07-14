import { ShoppingListService } from "./../shopping-list/shopping-list.service";
import { Component, OnInit } from "@angular/core";

import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipes.service";
@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }
}
