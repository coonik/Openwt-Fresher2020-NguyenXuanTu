import { Directive, ElementRef, Renderer2, OnInit, HostListener, HostBinding, Input, OnChanges, DoCheck } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit, DoCheck {
  @HostBinding('style.textAlign')
  @Input('appBetterHighlight')
  positionInput: string = 'center';

  tAlign: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elRef.nativeElement,'text-align','center');
    this.tAlign = this.positionInput;
    // console.log(this.positionInput);

  }

  ngDoCheck() {
    this.positionInput === 'left' ? this.positionInput = 'center' : this.positionInput === 'center' ? this.positionInput = 'right' : this.positionInput = 'left';
  }

  @HostListener('mouseenter')
  mouseover(eventData: Event){
    // this.renderer.setStyle(this.elRef.nativeElement,'text-align','left');
    this.tAlign = this.positionInput;
  }

  @HostListener('mouseleave')
  mouseleave(eventData: Event){
    // this.renderer.setStyle(this.elRef.nativeElement,'text-align','right');
    this.tAlign = this.positionInput
  }
}
