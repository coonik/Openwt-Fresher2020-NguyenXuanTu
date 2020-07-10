import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output('ingredientAddItem')
  ing = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }


  onClickAdd() {
    const name = this.nameInput.nativeElement.value;
    const amount = this.amountInput.nativeElement.value;
    const ingAdd = new Ingredient(name, amount);
    this.ing.emit(ingAdd);
  }
}
