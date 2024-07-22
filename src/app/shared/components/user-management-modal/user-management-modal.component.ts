import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GymService } from 'src/app/components/services/gym.service';

@Component({
  selector: 'app-user-management-modal',
  templateUrl: './user-management-modal.component.html',
  styleUrls: ['./user-management-modal.component.scss']
})
export class UserManagementModalComponent implements OnInit {

  user: any;

  phonePrefixes: string[] = [];
  subscriptionTypes: string[] = [];

  clientData = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [''],
    phonePrefix: ['+44', Validators.required],
    phoneNumber: ['', Validators.required],
    subscriptionType: ['MONTH', Validators.required],
    subscriptionNumber: ['', Validators.required],
    startDate: [''],
    endDate: [''],
    subscriptionPrice: ['']
  });

  constructor( public dialogRef: MatDialogRef<UserManagementModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private gymService: GymService) {
      if(data) {
        this.user = data.user;
        console.log(this.user);

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

    this.gymService.getGymSubscriptionTypes().subscribe((data: any) => {
      console.log(data);
      this.subscriptionTypes = data;
    });

    this.gymService.getPhonePrefixes().subscribe((data: any) => {
      console.log(data);
      this.phonePrefixes = data;
    });

    this.clientData.valueChanges.subscribe((data) => {
      if(data.subscriptionType && data.subscriptionNumber) {
        const subscriptionPrice = data.subscriptionType === 'MONTH' ? this.gymService.gymPrice.month : data.subscriptionType === 'DAY' ? this.gymService.gymPrice.day : this.gymService.gymPrice.year;
        this.clientData.patchValue({
          subscriptionTypes: data.subscriptionType.toUpperCase(),
          subscriptionPrice: subscriptionPrice * data.subscriptionNumber
        }, { emitEvent: false });
      } else {
        this.clientData.patchValue({
          subscriptionPrice: ''
        }, { emitEvent: false});
      }
    });
  }

  saveUser() {
    const payload = {
      ...this.clientData.value,
      gymId: this.gymService.gymId,
      role: "CLIENT"
    };
    this.gymService.addClient(payload).subscribe((data) => {
      this.dialogRef.close(data);
    });
  }

  close() {
    this.dialogRef.close();
  }

}
