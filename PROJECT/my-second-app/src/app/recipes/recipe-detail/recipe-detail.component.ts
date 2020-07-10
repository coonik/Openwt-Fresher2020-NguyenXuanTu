import { Recipe } from './../recipe.model';
import { Component, OnInit, Input, DoCheck } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, DoCheck {
  @Input('recipe') recipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {
  }
}
