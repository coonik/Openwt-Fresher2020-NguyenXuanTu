import { RecipeService } from "./../recipes.service";
import { Component, OnInit, EventEmitter, Output, OnDestroy } from "@angular/core";

import { Recipe } from "../recipe.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  sub: Subscription

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRepices();
    this.sub = this.recipeService.recipesChanged
      .subscribe(
        (value) => {
          this.recipes = this.recipeService.getRepices();
        }
      )
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
}
