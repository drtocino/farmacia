import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Producto } from '../models/Producto';
import { Response } from '../models/Response';

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
      //console.log(resp)
      this.productos = resp
      //this.usuarios.push(...resp)
    })
  }

  crearProducto(){
    Swal.fire({
      title: "Registrar producto",
      html: `
      <div class="grid grid-cols-3  gap-2 text-left text-sm m-1">
        <label class="">Nombre</label>
        <input id="nombre" class="col-span-2 border text-sm px-2 py-1.5 border-slate-700 w-auto bg-slate-800 rounded" />
        <label class="">Stock</label>
        <input id="stock" class="col-span-2 border text-sm px-2 py-1.5 border-slate-700 w-auto bg-slate-800 rounded" />
        <label class="">Precio unitario</label>
        <input id="precio" class="col-span-2 border text-sm px-2 py-1.5 border-slate-700 w-auto bg-slate-800 rounded" />
        <label class="">Laboratorio</label>
        <input id="laboratorio" class="col-span-2 border text-sm px-2 py-1.5 border-slate-700 w-auto bg-slate-800 rounded" />
        <label class="">Descripcion</label>
        <textarea id="descripcion" class="col-span-2 border text-sm px-2 py-1.5 border-slate-700 w-auto bg-slate-800 rounded" ></textarea>
      </div>
      `,
      background: "rgb(15 23 42)",
      color: "white",
      confirmButtonColor: 'rgb(5 150 105)',
      confirmButtonText: "Registrar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      preConfirm: () => {
        //var nombre = document.getElementById("nombre").value;
        this.http.post<Response>("http://localhost:3001/postProducto",{
          nombre: (<HTMLInputElement>document.getElementById('nombre')).value,
          stock: (<HTMLInputElement>document.getElementById('stock')).value,
          precio: (<HTMLInputElement>document.getElementById('precio')).value,
          laboratorio: (<HTMLInputElement>document.getElementById('laboratorio')).value,
          descripcion: (<HTMLInputElement>document.getElementById('descripcion')).value,
        }).subscribe((val) => {
          this.getProductos();
          //console.log(val)
          val ? Swal.fire({
            title: "Exito",
            icon: "success",
            text: "Se registro correctamente el producto",
            confirmButtonColor: 'rgb(5 150 105)',
            iconColor: 'rgb(5 150 105)',
            background: "rgb(15 23 42)",
          color: "white",
          })
          : Swal.fire({
            title: "Error",
            icon: "error",
            text: "Ocurrio un error, revise los datos e intente de nuevo por favor",
            confirmButtonColor: 'rgb(220 38 38)',
            background: "rgb(15 23 42)",
            color: "white",
          })
        })
      }
    })
  }

  eliminarProducto(id: string){
    Swal.fire({
      title: "Eliminar producto",
      html: `

      Seguro que desea eliminar el producto con id: <span class="font-bold">${id}</span>? Esta accion no se puede deshacer
      `,
      icon: 'warning',
      iconColor: "red",
      background: "rgb(15 23 42)",
      color: "white",
      confirmButtonColor: 'rgb(220 38 38)',
      confirmButtonText: "Eliminar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      preConfirm: () => {
        this.http.delete<Response>(`http://localhost:3001/delLaboratorio/${id}`).subscribe((val) => {
          this.getProductos();
          val ? Swal.fire({
            title: "Exito",
            icon: "success",
            text: "Se elimino correctamente el producto",
            confirmButtonColor: 'rgb(5 150 105)',
            iconColor: 'rgb(5 150 105)',
            background: "rgb(15 23 42)",
            color: "white",
          })
          : Swal.fire({
            title: "Error",
            icon: "error",
            text: "Ocurrio un error, revise los datos e intente de nuevo por favor",
            confirmButtonColor: 'rgb(220 38 38)',
            background: "rgb(15 23 42)",
            color: "white",
          })
        })
      }
    })
  }

  editarProducto(datos : any){
    Swal.fire({
      title: "Editar producto",
      html: `
      <div class="grid grid-cols-3 gap-2 text-left text-sm m-0.5">
        <label class="">Nombre</label>
        <input id="nombre" class="col-span-2 border text-sm px-2 py-1.5 border-slate-700 w-auto bg-slate-800 rounded" value="${datos.nombre}" />
        <label class="">Stock</label>
        <input id="stock" class="col-span-2 border text-sm px-2 py-1.5 border-slate-700 w-auto bg-slate-800 rounded" value="${datos.stock}" />
        <label class="">Precio unitario</label>
        <div class="col-span-2 flex w-full">
        <span class="inline-flex items-center px-3 min-w-fit text-sm text-gray-900 bg-gray-200 rounded-l border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600">Bs</span>
        <input id="precio" class="  border text-sm px-2 py-1.5 border-slate-700 w-full bg-slate-800 rounded-r" value="${datos.precio}" />
        </div>
        <label class="">Laboratorio</label>
        <input id="laboratorio" class="col-span-2 border text-sm px-2 py-1.5 border-slate-700 w-auto bg-slate-800 rounded" value="${datos.laboratorio}" />
        <label class="">Descripcion</label>
        <textarea id="descripcion" class="col-span-2 border text-sm px-2 py-1.5 border-slate-700 w-auto bg-slate-800 rounded" >${datos.descripcion}</textarea>
      </div>
      `,
      background: "rgb(15 23 42)",
      color: "white",
      confirmButtonColor: 'rgb(5 150 105)',
      confirmButtonText: "Editar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        this.http.put<Response>(`http://localhost:3001/putProducto/${datos._id}`,{
          nombre: (<HTMLInputElement>document.getElementById('nombre')).value,
          stock: (<HTMLInputElement>document.getElementById('stock')).value,
          precio: (<HTMLInputElement>document.getElementById('precio')).value,
          laboratorio: (<HTMLInputElement>document.getElementById('laboratorio')).value,
          descripcion: (<HTMLInputElement>document.getElementById('descripcion')).value,
        }).subscribe((val) => {
          console.log(val)
          val.acknowledged ? Swal.fire({
            title: "Exito",
            icon: "success",
            text: "Se edito correctamente el producto",
            confirmButtonColor: 'rgb(5 150 105)',
            iconColor: 'rgb(5 150 105)',
            background: "rgb(15 23 42)",
            color: "white",
          })
          : Swal.fire({
            title: "Error",
            icon: "error",
            text: "Ocurrio un error, revise los datos e intente de nuevo por favor",
            confirmButtonColor: 'rgb(220 38 38)',
            background: "rgb(15 23 42)",
            color: "white",
          })
          this.getProductos()
        })
      }
    })
  }

}
