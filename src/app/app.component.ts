import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { Session } from './models/Session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  session : Session = new Session();
  logged : boolean = false;
  title = 'Farmacia';

  faCoffe = faCoffee;

  constructor(private cookieService : CookieService){}

  ngOnInit(): void {
    if(this.cookieService.get('nombre')){
      this.logged = true;
    }
  }
  
  handleAuth(session : Session){
    this.logged = session.logged
    console.log(session);
  }

}
