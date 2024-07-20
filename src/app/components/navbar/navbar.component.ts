import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isNavOpened = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeStateOfNavbar() {
    this.isNavOpened = !this.isNavOpened;
  }

}
