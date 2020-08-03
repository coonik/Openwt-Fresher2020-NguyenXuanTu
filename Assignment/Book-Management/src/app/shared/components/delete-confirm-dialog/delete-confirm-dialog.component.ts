import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageDialogService } from '../../services/message-dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: './delete-dialog',
  template: `<h2 mat-dialog-title>Delete this {{ message }} ?</h2>
  <mat-dialog-content class="mat-typography">
    <h3>Are you sure ?</h3>
    <p>This step cannot be undone</p>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-button color="warn" [mat-dialog-close]="true" cdkFocusInitial>Delete</button>
  </mat-dialog-actions>
  `,
})
export class DeleteConfirmDialog implements OnInit, OnDestroy {
  message: string;
  messageSub: Subscription;

  constructor(private messageDialogService: MessageDialogService) {}

  ngOnInit() {
    this.messageSub = this.messageDialogService.currentMessage.subscribe(
      val => this.message = val
    );
  }

  ngOnDestroy() {
    this.messageSub.unsubscribe();
  }
}
