import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faAdd, faBoxArchive, faBoxesPacking, faInbox, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ItemCompra } from '../models/ItemCompra';
import { Producto } from '../models/Producto';

@Component({
  selector: 'facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {

  iconoAumentar = faAdd
  iconoQuitar = faMinus
  iconoAgregar = faBoxesPacking

  listaCompra : ItemCompra[] = [];
  productos : Producto[] = [];
  productosFilter : Producto[] = [];
  busqueda : string = "";
  total : number = 0;

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getProductos()
  }

  getProductos(){
    this.http.get("http://localhost:3001/getProductos").subscribe((resp : any) => {
      //console.log(resp)
      this.productos = resp
      this.productosFilter = resp
      //this.usuarios.push(...resp)
    })
  }

  actualizarTotal(monto : number){
    this.total = this.total + monto;
  }

  agregarCompra(prod : Producto){
    //console.log(prod)
    let existe = this.listaCompra.find(o => o.nombre === prod.nombre);
    if(existe){
      this.listaCompra[this.listaCompra.findIndex(o => o.nombre === prod.nombre)].cantidad++;
    }else{
      var item = new ItemCompra();
      item.nombre = prod.nombre;
      item.cantidad = 1;
      item.precioUnitario = prod.precio;
      this.listaCompra.push(item);
    }
    this.actualizarTotal(Number(prod.precio))
  }

  aumentarCantidad(nombre : string){
    this.listaCompra.map((item) => {
      if(item.nombre === nombre){
        item.cantidad++;
        this.actualizarTotal(Number(item.precioUnitario))
      }
    })
    
  }

  disminuirCantidad(nombre : string){
    this.listaCompra.map((item) => {
      if(item.nombre === nombre){
        item.cantidad--;
        this.actualizarTotal(-Number(item.precioUnitario))
        this.listaCompra = this.listaCompra.filter(i => i.cantidad != 0);
      }
    })
  }

  filtrarProductos(){
    if(this.busqueda.length > 2){
      this.productos.map((val) => {
        console.log(val.nombre.match(this.busqueda))
        this.productosFilter = this.productos.filter(o => o.nombre.toLowerCase().match(this.busqueda.toLowerCase()))
      })
    }else{
      this.productosFilter = this.productos
    }
  }

}
