import { DataService } from './services/data.service';
import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef,
} from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? event.srcElement.toString() === "[object HTMLSpanElement]" ? !this.isOpen : true : false;
    if (!this.isOpen) {
      this.dataService.setIsChangePassword(false);
    }
  }

  constructor(private elRef: ElementRef, private dataService: DataService) {}
}
