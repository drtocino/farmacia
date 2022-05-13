import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios : any[] = [];

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getUsuarios()
  }

  getUsuarios(){
    this.http.get("http://localhost:3001/getUsuarios").subscribe((resp : any) => {
      console.log(resp)
      this.usuarios = resp
      //this.usuarios.push(...resp)
    })
  }

}
