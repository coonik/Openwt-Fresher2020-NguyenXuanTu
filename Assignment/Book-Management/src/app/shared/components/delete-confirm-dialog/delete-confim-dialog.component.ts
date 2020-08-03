import { Component } from '@angular/core';

@Component({
  selector: './delete-dialog',
  template: `<h2 mat-dialog-title>Delete this book ?</h2>
  <mat-dialog-content class="mat-typography">
    <h3>Are you sure ?</h3>
    <p>This step cannot be undone</p>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Delete</button>
  </mat-dialog-actions>
  `,
})
export class DeleteConfirmDialog {}
