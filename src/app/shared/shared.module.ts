import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { UserManagementModalComponent } from './components/user-management-modal/user-management-modal.component';

const COMPONENTS: any[] = [];

const NB_MODULES: any[] = [
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ...NB_MODULES
  ],
  exports: [
    ...NB_MODULES,
    ...COMPONENTS
  ]
})
export class SharedModule { }
