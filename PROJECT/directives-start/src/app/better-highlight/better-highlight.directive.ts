import { Directive, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.elRef.nativeElement,'text-align','center');
  }

  @HostListener('mouseenter')
  mouseover(eventData: Event){
    this.renderer.setStyle(this.elRef.nativeElement,'text-align','left');
  }

  @HostListener('mouseleave')
  mouseleave(eventData: Event){
    this.renderer.setStyle(this.elRef.nativeElement,'text-align','right');
  }
}
