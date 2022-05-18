import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faArrowAltCircleRight, faArrowRight, faCaretLeft, faCaretRight, faCoffee, faDashboard, faGripHorizontal, faPills, faStaffAesculapius, faTriangleCircleSquare, faTriangleExclamation, faUsers } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  dashboard = faGripHorizontal
  users = faUsers
  pills = faPills
  arrow = faCaretLeft
  logo = faStaffAesculapius

  sideBar : boolean = false;
  rol : string = "";

  @Output() hideNavBar = new EventEmitter();

  constructor(private cookieService : CookieService) { }

  ngOnInit(): void {
    this.cookieService.get("nombre") ? this.sideBar = true : this.sideBar = false;
    this.cookieService.get("rol") ? this.rol = this.cookieService.get("rol") : this.rol = "";
  }
  

  hideNav(){
    this.sideBar = !this.sideBar;
    this.hideNavBar.emit(!this.sideBar)
  }

}
