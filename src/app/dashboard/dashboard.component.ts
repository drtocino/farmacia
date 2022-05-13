import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nombre : string = "";

  constructor(private http : HttpClient,private cookieService : CookieService,private router: Router) { }

  ngOnInit(): void {
    this.getLogin();
  }

  getLogin(){
    // this.http.get("http://localhost:3001/login",{withCredentials: true}).subscribe((resp) => {
    //   //console.log(resp);
    // })
    if(this.cookieService.get("nombre")){
      console.log(this.cookieService.get("nombre"))
      this.nombre = this.cookieService.get("nombre");
    }else{
      this.router.navigate(['/']);
    }
  }

}
