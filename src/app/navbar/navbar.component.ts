import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleRight, faArrowRight, faCaretLeft, faCaretRight, faCheck, faCoffee, faDashboard, faFlaskVial, faGripHorizontal, faHouseChimneyMedical, faLadderWater, faMoneyBill, faMoneyBill1, faMoneyBill1Wave, faMoneyBillAlt, faMoneyBillWheat, faPills, faSignOut, faStaffAesculapius, faTriangleCircleSquare, faTriangleExclamation, faUsers } from '@fortawesome/free-solid-svg-icons';
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
  signout = faSignOut
  venta = faMoneyBill1Wave
  laboratorio = faFlaskVial

  sideBar : boolean = false;
  rol : string = "";

  admin = "admin"
  farmaceutico = "farmaceutico"
  cajero = "cajero"

  @Output() hideNavBar = new EventEmitter();

  constructor(private cookieService : CookieService,private router : Router) { }

  ngOnInit(): void {
    this.cookieService.get("nombre") ? this.sideBar = true : this.sideBar = false;
    this.cookieService.get("rol") ? this.rol = this.cookieService.get("rol") : this.rol = "";
  }
  

  hideNav(){
    this.sideBar = !this.sideBar;
    this.hideNavBar.emit(!this.sideBar)
  }

  salir(){
    this.cookieService.deleteAll("/");
    this.router.navigate(['/'])
  }

}
