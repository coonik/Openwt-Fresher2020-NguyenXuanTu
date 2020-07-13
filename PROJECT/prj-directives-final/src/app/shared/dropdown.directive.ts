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
  @HostBinding("class.open") isOpen = true;

  @HostListener("document:click", ["$event"]) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
    // console.log(this.elRef.nativeElement);
    // console.log(event.target);
    // console.log("gia tri: " + this.elRef.nativeElement.contains(event.target));
  }

  constructor(private elRef: ElementRef) {}
}
