import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Session } from '../models/Session';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario : string = "";
  clave : string = "";
  session : Session = new Session();

  @Output() enviarForm = new EventEmitter();

  constructor(private router: Router,private http : HttpClient,private cookieService : CookieService) { }

  ngOnInit(): void {
    // this.verificar().subscribe((val) => {
    //   console.log(val)
    // })
  }

  verificar(){
    const verificacion = this.http.post<Session>("http://localhost:3001/login",{user: this.usuario, pass: this.clave});
    const resultado: any[] = [];
    verificacion.subscribe((val) => {
      this.session.exists = val.exists;
      this.session.passCorrect = val.passCorrect;
      this.session.logged = true;
      this.session.nombre = val.nombre
      if(val.exists && val.passCorrect){
        Swal.fire({
          title: 'Bienvenido',
          text: 'Autenticacion correcta',
          confirmButtonColor: 'rgb(5 150 105)'
        });
        this.enviarForm.emit(this.session );
        this.cookieService.set("nombre", val.nombre);
        this.router.navigate(['/app']);
      }else{
        if(val.exists){
          Swal.fire({
            title: "Error",
            text: "Clave incorrecta, por favor intenta de nuevo",
            confirmButtonColor: 'rgb(5 150 105)'
          })
        }
        if(!val.exists){
          Swal.fire({
            title: "Error",
            text: "No existe el usuario, intenta de nuevo por favor",
            confirmButtonColor: 'rgb(5 150 105)'
          })
        }
      }
      //console.log(val)
    })
    //console.log(this.session)
    
  }
  
  confirmarAutenticacion(){
    this.enviarForm.emit(this.session);
  }

}
