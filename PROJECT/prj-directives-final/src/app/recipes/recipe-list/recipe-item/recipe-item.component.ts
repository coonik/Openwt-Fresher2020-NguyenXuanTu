import { Component, OnInit, Input } from "@angular/core";

import { Recipe } from "../../recipe.model";
import { RecipeService } from "../../recipes.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {

  }

  onSelected() {
    this.router.navigate(['edit'], {relativeTo: this.route})
    console.log(this.router.navigate);

  }
}
