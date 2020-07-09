import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';

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
  @ViewChild('serverContentInput') serverContentInput;
  // @Input()
  // public myCallback: Function;

  constructor() { }

  ngOnInit(): void {
  }


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
}
