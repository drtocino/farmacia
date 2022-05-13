import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleRight, faArrowRight, faCaretRight, faCoffee, faDashboard, faGripHorizontal, faPills, faTriangleCircleSquare, faTriangleExclamation, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  dashboard = faGripHorizontal
  users = faUsers
  pills = faPills
  arrow = faCaretRight

  constructor() { }

  ngOnInit(): void {
  }

  hideNav(){
    
  }

}
