import { Component, OnInit, Input } from "@angular/core";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipes.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    console.log("ok");

    this.route.params
      .subscribe(
        (params: Params) => {
          this.recipe = this.recipeService.getRecipe(+params['id']);
          this.recipeService.currentRecipeIndex = +params['id'];
          console.log(+params['id']);

        }
      )
  }

  addToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe();
  }
}
