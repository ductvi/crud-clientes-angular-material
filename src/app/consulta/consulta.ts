import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Cliente } from '../cadastro/cliente';
import { Clienteservice } from '../clienteservice';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule, 
    MatCardModule,
    FlexLayoutModule, 
    MatIconModule,
    FormsModule, 
    MatTableModule, 
    MatButtonModule, 
    CommonModule
  ],
  templateUrl: './consulta.html',
  styleUrl: './consulta.css',
})
export class Consulta implements OnInit {

  nomeBusca: string = '';
  listaClientes: Cliente[] = [];
  colunasTabela: string[] = ["id", "nome", "cpf", "datanascimento", "email", "acoes"];
  snack: MatSnackBar = inject(MatSnackBar)
  // Armazena o cliente que está aguardando confirmação de exclusão
  clienteSelecionado?: Cliente;

  constructor(
    private router: Router,
    private service: Clienteservice
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  pesquisar(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.listaClientes = [...this.service.pesquisarClientes(this.nomeBusca)];
  }

  preparaEditar(id: string): void {
    this.router.navigate(['/cadastro'], { queryParams: { id } });
  }

  // Define qual cliente será deletado antes de abrir a confirmação
  preparandoDeletar(cliente: Cliente): void {
    this.clienteSelecionado = cliente;
  }

  confirmarDeletar(): void {
    if (this.clienteSelecionado) {
      this.service.deletar(this.clienteSelecionado);
      this.clienteSelecionado = undefined;
      this.carregarClientes(); // Recarrega a lista mantendo a pesquisa atual
      this.snack.open("Deletado Com Sucesso!", "Ok")
    }
  }

  cancelarDeletar(): void {
    this.clienteSelecionado = undefined;
  }
}