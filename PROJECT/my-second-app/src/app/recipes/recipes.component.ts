import { Recipe } from './recipe.model';
import { Component, OnInit, Input, DoCheck } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, DoCheck {
  recipes: Recipe[] = [new Recipe('Bun bo hue','dac san hue','https://monngonbamien.org/wp-content/uploads/2019/10/cach-nau-bun-bo-hue-mien-nam-de-ban-don-gia-chuan-vi-ngon-nhat.jpg'),new Recipe('My Quang','dac san Quang Nam','https://monngonbamien.org/wp-content/uploads/2019/10/cach-nau-bun-bo-hue-mien-nam-de-ban-don-gia-chuan-vi-ngon-nhat.jpg')];
  @Input('recipeWasSelected')
  recipeWasSelected: Recipe;

  recipe: Recipe;
  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {
  }

  onSelected(value) {
    this.recipe = value;
    console.log(this.recipe);

  }
}
