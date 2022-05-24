import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Laboratorio } from '../models/Laboratorio';
import { Response } from '../models/Response';

@Component({
  selector: 'app-laboratorios',
  templateUrl: './laboratorios.component.html',
  styleUrls: ['./laboratorios.component.css']
})
export class LaboratoriosComponent implements OnInit {

  laboratorios : Laboratorio[] = [];

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getLaboratorios()
  }

  getLaboratorios(){
    this.http.get("http://localhost:3001/getLaboratorios").subscribe((resp : any) => {
      //console.log(resp)
      this.laboratorios = resp
      //this.usuarios.push(...resp)
    })
  }

  crearLaboratorio(){
    Swal.fire({
      title: "Registrar laboratorio",
      html: `
      <div class="grid grid-cols-3  gap-2 text-left text-sm m-1">
        <label class="">Nombre</label>
        <input id="nombre" class="col-span-2 border text-sm px-2 py-1.5 border-slate-700 w-auto bg-slate-800 rounded" />
        <label class="">Locacion</label>
        <input id="locacion" class="col-span-2 border text-sm px-2 py-1.5 border-slate-700 w-auto bg-slate-800 rounded" />
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
        this.http.post<Response>("http://localhost:3001/postLaboratorio",{
          nombre: (<HTMLInputElement>document.getElementById('nombre')).value,
          locacion: (<HTMLInputElement>document.getElementById('locacion')).value,
        }).subscribe((val) => {
          this.getLaboratorios();
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

  editarLaboratorio(datos : any){
    Swal.fire({
      title: "Editar laboratorio",
      html: `
      <div class="grid grid-cols-3 gap-2 text-left text-sm m-0.5">
        <label class="">Nombre</label>
        <input id="nombre" class="col-span-2 border text-sm px-2 py-1.5 border-slate-700 w-auto bg-slate-800 rounded" value="${datos.nombre}" />
        <label class="">Locacion</label>
        <input id="locacion" class="col-span-2 border text-sm px-2 py-1.5 border-slate-700 w-auto bg-slate-800 rounded" value="${datos.locacion}" />
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
        this.http.put<Response>(`http://localhost:3001/putLaboratorio/${datos._id}`,{
          nombre: (<HTMLInputElement>document.getElementById('nombre')).value,
          locacion: (<HTMLInputElement>document.getElementById('locacion')).value,
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
          this.getLaboratorios()
        })
      }
    })
  }

  eliminarLaboratorio(id: string){
    Swal.fire({
      title: "Eliminar laboratorio",
      html: `

      Seguro que desea eliminar el laboratorio con id: <span class="font-bold">${id}</span>? Esta accion no se puede deshacer
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
        this.http.delete<Response>(`http://localhost:3001/delProducto/${id}`).subscribe((val) => {
          this.getLaboratorios();
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

}
