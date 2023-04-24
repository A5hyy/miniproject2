import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-copy-password',
  templateUrl: './copy-password.component.html',
  styleUrls: ['./copy-password.component.scss']
})
export class CopyPasswordComponent implements OnInit {
  value;

  constructor(public dialogRef: MatDialogRef<CopyPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.value = this.data.password;
  }

  onCancelClick($event: MouseEvent) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    this.dialogRef.close(false);
  }
}
