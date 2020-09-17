import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/common/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente"

  public errores: string[];

  constructor(private clienteService: ClienteService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente
        )
      }
    })
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo cliente', `Cliente ${cliente.first_name} creado exitosamente`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
      })
  }

  update(): void{
    this.clienteService.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente actualizado', `Cliente actualizado exitosamente`, 'success')
      
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    )
  }

}
