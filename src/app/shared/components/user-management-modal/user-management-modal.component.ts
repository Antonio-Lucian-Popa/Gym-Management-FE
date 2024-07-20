import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-management-modal',
  templateUrl: './user-management-modal.component.html',
  styleUrls: ['./user-management-modal.component.scss']
})
export class UserManagementModalComponent implements OnInit {

  user: any;

  clientData = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [''],
    phonePrefix: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    subscriptionType: ['', Validators.required],
    subscriptionNumber: ['', Validators.required],
    startDate: [''],
    endDate: [''],
    subscriptionPrice: ['']
  });

  constructor( public dialogRef: MatDialogRef<UserManagementModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
      if(data) {
        this.user = data.user;

        this.clientData.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          phonePrefix: this.user.phonePrefix,
          phoneNumber: this.user.phoneNumber,
          subscriptionType: this.user.subscriptionType,
          subscriptionNumber: this.user.subscriptionNumber,
          startDate: this.user.startDate,
          endDate: this.user.endDate,
          subscriptionPrice: this.user.subscriptionPrice
        });
      }
    }

  ngOnInit(): void {
  }

  saveUser() {}

  close() {
    this.dialogRef.close();
  }

}
