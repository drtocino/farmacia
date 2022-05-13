import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos : any[] = [];

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getProductos();
  }
  
  getProductos(){
    this.http.get("http://localhost:3001/getProductos").subscribe((resp : any) => {
      console.log(resp)
      this.productos = resp
      //this.usuarios.push(...resp)
    })
  }

}
