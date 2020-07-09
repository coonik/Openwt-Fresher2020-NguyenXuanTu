import { Component, OnInit, Input, EventEmitter, Output, ViewChild, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  // newServerName = '';
  // newServerContent = '';

  @Output('svCreated')
  serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated')
  blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Input() serverElements;
  @ViewChild('serverContentInput',{static: true}) serverContentInput;
  // @Input()
  // public myCallback: Function;

  onAddServer(svName: string, ) {
    this.serverCreated.emit({
      serverName: svName,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(svName: string) {
    this.blueprintCreated.emit({
      serverName: svName,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  constructor() {
    console.log("constructor called!");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges called!");
  }

  ngOnInit(): void {
    console.log("ngOnInit called!");

  }


  ngDoCheck() {
      console.log("ngDoCheck called!");
      console.log(this.serverContentInput.nativeElement.value);
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit called!");

  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked called!");

  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit called!");
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked called!");

  }

  ngOnDestroy() {
    console.log("ngOnDestroy called!");

  }
}
