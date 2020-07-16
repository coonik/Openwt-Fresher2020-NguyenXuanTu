import { OnDestroy } from '@angular/core';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  sub: Subscription;
  editMode = false;
  editedItemIndex: number;


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.sub = this.shoppingListService.startedEditting.subscribe(
      (index) => {
        this.editMode = true;
        this.editedItemIndex = index;
      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    this.ingredientAdded.emit(newIngredient);
  }

}
