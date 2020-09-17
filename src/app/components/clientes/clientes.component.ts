import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/common/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import Swal from 'sweetalert2';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { UserDetail } from 'src/app/common/userDetail';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  isLoggedIn: boolean = false;
  user: UserDetail = new UserDetail();
  isAdmin: boolean = false;

  constructor(private clientesService: ClienteService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.isAdmin = this.user.authorities.some(e => e.authority == 'ROLE_ADMIN');
    }
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.clientesService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire(
              'Deleted!',
              'Your client has been deleted.',
              'success'
            )
          }
        )
      }
    })
  }

}
