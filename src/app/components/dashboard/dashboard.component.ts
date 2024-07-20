import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GymService } from '../services/gym.service';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserManagementModalComponent } from 'src/app/shared/components/user-management-modal/user-management-modal.component';

const ELEMENT_DATA: any[] = [
  {
    id: "d4ce1675-e7f5-419d-8a1c-c197ef055ba8",
    firstName: "Andrei",
    lastName: "Savu",
    email: "andrei@gmail.com",
    password: "test",
    phoneNumber: "0722222222",
    role: "CLIENT",
    subscriptionId: "9e870b06-5e6d-4d9c-bf7e-0937e8fe78b5",
  }
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatTable)
  table!: MatTable<any>;


  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'startDate', 'endDate', 'actions'];
  dataSource = new MatTableDataSource();

  gymUsers: any[] = [];

  constructor(private gymService: GymService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // make a forkjoin to get all users for that gym id with the subscription details
    forkJoin([
      this.gymService.getGymClients(this.gymService.gymId),
      this.gymService.getGymSubscriptions(this.gymService.gymId)
    ]).subscribe(([clients, subscriptions]) => {
      // merge the two arrays into one
      this.gymUsers = clients.map((client: any) => {
        let subscription = subscriptions.find((subscription: any) => subscription.id === client.subscriptionId);
        return { ...client, ...subscription };
      });
      console.log(this.gymUsers);
      this.dataSource = new MatTableDataSource(this.gymUsers);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser() {
    const dialogRef = this.dialog.open(UserManagementModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editUser(user: any) {
    const dialogRef = this.dialog.open(UserManagementModalComponent, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteUser(user: any) { }

}
