import { Directive, ElementRef, Renderer2, OnInit, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @HostBinding('style.textAlign')
  tAlign: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elRef.nativeElement,'text-align','center');
    this.tAlign = 'center'
  }

  @HostListener('mouseenter')
  mouseover(eventData: Event){
    // this.renderer.setStyle(this.elRef.nativeElement,'text-align','left');
    this.tAlign = "left";
  }

  @HostListener('mouseleave')
  mouseleave(eventData: Event){
    // this.renderer.setStyle(this.elRef.nativeElement,'text-align','right');
    this.tAlign = 'right'
  }
}
