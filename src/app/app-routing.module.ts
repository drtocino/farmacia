import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "app", component: DashboardComponent,
  // children: [
  //   //{path: "", component: DashboardComponent},
  // ]
},
  {path: "app/usuarios", component: UsuariosComponent},
  {path: "app/productos", component: ProductosComponent},
  {path: "app/vender", component: FacturacionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
