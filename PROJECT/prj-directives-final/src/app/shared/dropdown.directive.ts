import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  @HostBinding("class.open") isOpen = true;

  @HostListener("dblclick") toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
